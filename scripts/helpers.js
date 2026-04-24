/**
 * W20 Scripts Helpers
 * Shared utilities for parsing, formatting, and file operations
 */

const fs = require('fs');
const path = require('path');

// ===== File I/O =====

function readFile(filepath) {
  try {
    return fs.readFileSync(filepath, 'utf8');
  } catch (err) {
    console.error(`Error reading ${filepath}: ${err.message}`);
    return null;
  }
}

function writeFile(filepath, content) {
  try {
    fs.writeFileSync(filepath, content, 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filepath}: ${err.message}`);
    return false;
  }
}

function fileExists(filepath) {
  return fs.existsSync(filepath);
}

function listFiles(dirpath) {
  try {
    return fs.readdirSync(dirpath);
  } catch (err) {
    console.error(`Error listing ${dirpath}: ${err.message}`);
    return [];
  }
}

// ===== YAML Parsing =====

function parseYAML(text) {
  const yamlMatch = text.match(/^---\n([\s\S]*?)\n---/);
  if (!yamlMatch) return {};

  const yamlText = yamlMatch[1];
  const fields = {};

  yamlText.split('\n').forEach(line => {
    const match = line.match(/^([^:]+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      fields[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
    }
  });

  return fields;
}

function formatTaskLine(task) {
  let line = '';
  if (task.completed) line += 'x ';
  if (task.priority && task.priority !== 'C') line += `(${task.priority}) `;
  if (task.created) line += `${task.created} `;
  line += task.description;
  if (task.location) line += ` +${task.location}`;
  if (task.context) line += ` @${task.context}`;
  if (task.due) line += ` due:${task.due}`;
  return line;
}

function parseTaskLine(line) {
  const match = line.match(/^(x\s+)?(\([A-C]\))?\s*(\d{4}-\d{2}-\d{2})?\s*(.+?)(?:\s+\+([^\s]+))?(?:\s+@([^\s]+))?(?:\s+due:(\d{4}-\d{2}-\d{2}))?$/);

  if (!match) return null;

  return {
    completed: !!match[1],
    priority: match[2] ? match[2].slice(1, 2) : 'C',
    created: match[3] || new Date().toISOString().split('T')[0],
    description: match[4].trim(),
    location: match[5] || '',
    context: match[6] || '',
    due: match[7] || ''
  };
}

// ===== Date Utilities =====

function formatDate() {
  return new Date().toISOString().split('T')[0];
}

function daysUntil(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((date - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function isOverdue(dateStr) {
  return daysUntil(dateStr) < 0;
}

module.exports = {
  readFile,
  writeFile,
  fileExists,
  listFiles,
  parseYAML,
  formatTaskLine,
  parseTaskLine,
  formatDate,
  daysUntil,
  isOverdue
};
