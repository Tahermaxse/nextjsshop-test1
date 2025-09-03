require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const backupDir = path.join(__dirname, 'backups');

// Create backups directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(backupDir, `backup-${timestamp}.sql`);

// Get database URL from environment variables
const databaseUrl = process.env.DIRECT_URL;

if (!databaseUrl) {
    console.error('Database URL not found in environment variables');
    process.exit(1);
}

// Use double quotes for Windows compatibility and proper escaping
const command = `pg_dump "${databaseUrl}" > "${backupFile}"`;

console.log('Starting backup...');
console.log(`Command: ${command}`);

exec(command, { shell: true }, (error, stdout, stderr) => {
    if (error) {
        console.error(`Backup failed: ${error.message}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        return;
    }
    
    if (stderr) {
        console.warn(`Warning: ${stderr}`);
    }
    
    // Check if backup file was created and has content
    if (fs.existsSync(backupFile)) {
        const stats = fs.statSync(backupFile);
        if (stats.size > 0) {
            console.log(`✅ Backup created successfully!`);
            console.log(`📁 Location: ${backupFile}`);
            console.log(`📊 Size: ${(stats.size / 1024).toFixed(2)} KB`);
        } else {
            console.error('❌ Backup file was created but is empty');
        }
    } else {
        console.error('❌ Backup file was not created');
    }
});