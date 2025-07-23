#!/bin/sh

echo "🚀 Starting application..."

# Run database migration first
echo "📊 Running database migration..."
npm run migrate

# Check if migration was successful
if [ $? -eq 0 ]; then
    echo "✅ Migration completed successfully"
    echo "🌐 Starting Next.js application..."
    npm start
else
    echo "❌ Migration failed, exiting..."
    exit 1
fi 