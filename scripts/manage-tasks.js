#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { readFile, writeFile, parseTaskLine, formatTaskLine, formatDate, isOverdue } = require('./helpers');

const TASKS_FILE = path.join(__dirname, '..', '00-09 System & admin', '00 System management', '00.02 Tasks.md');

function readTasks() {
  const content = readFile(TASKS_FILE);
  if (!content) return [];
  const lines = content.split('\n');
  const tasks = [];
  lines.forEach(line => {
    if (!line.trim() || line.startsWith('#') || line.startsWith('---')) return;
    const task = parseTaskLine(line);
    if (task) tasks.push(task);
  });
  return tasks;
}

function writeTasks(tasks) {
  const header = `---
type: task-list
status: active
created: 2026-04-24
tags: [#w20/tasks, #w20/system]
ai_assisted: false
---

# Tasks – W20

`;
  const lines = tasks.map(task => formatTaskLine(task));
  const content = header + lines.join('\n');
  return writeFile(TASKS_FILE, content);
}

function addTask(description, options = {}) {
  const tasks = readTasks();
  const newTask = {
    completed: false,
    priority: options.priority || 'C',
    created: formatDate(),
    description,
    location: options.location || '',
    context: options.context || '',
    due: options.due || ''
  };
  tasks.push(newTask);
  if (writeTasks(tasks)) {
    console.log(`✅ Task added: "${description}"`);
    if (options.due) console.log(`   Due: ${options.due}`);
    if (options.location) console.log(`   Location: ${options.location}`);
    return true;
  }
  return false;
}

function completeTask(description) {
  const tasks = readTasks();
  let found = false;
  tasks.forEach(task => {
    if (task.description.toLowerCase().includes(description.toLowerCase())) {
      task.completed = true;
      found = true;
    }
  });
  if (found) {
    writeTasks(tasks);
    console.log(`✅ Task marked complete: "${description}"`);
    return true;
  }
  console.log(`❌ Task not found: "${description}"`);
  return false;
}

function listTasks(filter = {}) {
  const tasks = readTasks();
  let filtered = tasks.filter(t => !t.completed);
  if (filter.priority) filtered = filtered.filter(t => t.priority === filter.priority);
  if (filter.overdue) filtered = filtered.filter(t => t.due && isOverdue(t.due));
  
  if (filtered.length === 0) {
    console.log('No tasks matching filter.');
    return;
  }
  console.log(`📋 Tasks (${filtered.length}):\n`);
  filtered.forEach(task => {
    const priority = task.priority ? `(${task.priority})` : '   ';
    const due = task.due ? ` [due: ${task.due}]` : '';
    const location = task.location ? ` +${task.location}` : '';
    console.log(`${priority} ${task.description}${due}${location}`);
  });
}

function showOverdue() {
  const tasks = readTasks();
  const overdue = tasks.filter(t => !t.completed && t.due && isOverdue(t.due));
  if (overdue.length === 0) {
    console.log('✅ No overdue tasks.');
    return;
  }
  console.log(`⚠️  Overdue (${overdue.length}):\n`);
  overdue.forEach(task => {
    console.log(`(${task.priority}) ${task.description}`);
    console.log(`   Was due: ${task.due} ${task.location ? '+' + task.location : ''}`);
  });
}

const action = process.argv[2] || 'list';
const rest = process.argv.slice(3);

function parseOptions(args) {
  const options = {};
  args.forEach(arg => {
    if (arg.startsWith('--due=')) options.due = arg.split('=')[1];
    if (arg.startsWith('--priority=')) options.priority = arg.split('=')[1];
    if (arg.startsWith('--location=')) options.location = arg.split('=')[1];
  });
  return options;
}

switch (action) {
  case 'add':
    const description = rest.find(a => !a.startsWith('--'));
    if (!description) {
      console.error('Usage: manage-tasks.js add "description" [--due YYYY-MM-DD] [--priority A|B|C] [--location W20.XX.XX]');
      process.exit(1);
    }
    addTask(description, parseOptions(rest));
    break;
  case 'complete':
    const taskDesc = rest.find(a => !a.startsWith('--'));
    completeTask(taskDesc);
    break;
  case 'list':
    listTasks(parseOptions(rest));
    break;
  case 'overdue':
    showOverdue();
    break;
  default:
    console.error(`Unknown action: ${action}`);
    process.exit(1);
}
