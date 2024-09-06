const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const droppedTaskText = "Fix bugs in the application";
    const sourceUserId = 2; // User from which the task is moved
    const targetUserId = 1; // User to which the task is moved

    try {
        if (!droppedTaskText || !sourceUserId || !targetUserId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // Find the task for the specific user
        const existingtask = await prisma.task.findFirst({
            where: {
                user_id: sourceUserId,
                text: droppedTaskText,
            },
        });

        console.log('Task found:', existingtask);

        // Check if the task was found
        if (!existingtask) {
            console.log('Task do not exist');
            return;
        }

        // Create the new task for the target user
        const newTask = await prisma.task.create({
            data: {
                user_id: targetUserId,
                text: droppedTaskText,
            },
        });

        console.log('New task created:', newTask);

        // Delete the original task
        const deleteExistingTask = await prisma.task.delete({
            where: {
                task_id: existingtask.task_id, // Use task_id to delete the specific task
            },
        });

        if (deleteExistingTask) {
            console.log('Existing task deleted successfully');
        }

        console.log('Task moved successfully');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

