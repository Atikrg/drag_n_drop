const { PrismaClient } = require('@prisma/client');
const Prisma = new PrismaClient();

exports.findAllUsers = async (req, res) => {
    try {
        // Fetch all users
        const users = await Prisma.user.findMany(); // No need for include here

        // Send response
        res.status(200).json({ // Use 200 for success
            message: 'success',
            users
        });
    } catch (error) {
        // Handle error properly
        console.error('Error fetching users:', error); // Log the error for debugging
        res.status(500).json({ // Use 500 for server errors
            message: 'fail',
            error: error.message
        });
    }
};


exports.findAllUsersName = async (req, res) => {
    try {
        // Fetch all users
        const users = await Prisma.user.findMany({
            select: {
                name: true
            }
        }); // No need for include here

        // Send response
        res.status(200).json({ // Use 200 for success
            message: 'success',
            users
        });
    } catch (error) {
        // Handle error properly
        console.error('Error fetching users:', error); // Log the error for debugging
        res.status(500).json({ // Use 500 for server errors
            message: 'fail',
            error: error.message
        });
    }
};


exports.findAllTasks = async (req, res) => {
    try {
        // Fetch all tasks
        const tasks = await Prisma.task.findMany(); // Omit include if not using

        // Send response
        res.status(200).json({
            message: 'success',
            tasks
        });
    } catch (error) {
        // Handle error properly
        console.error('Error fetching tasks:', error); // Log the error for debugging
        res.status(500).json({
            message: 'fail',
            error: error.message
        });
    }
};

exports.dod = (req, res) => {
    res.send("hello"); // Correct usage of res.send
};


exports.fetchTasksWithUserNames = async (req, res) => {

    try {
        const usersWithTaskTexts = await Prisma.user.findMany({
            include: {
                tasks: {
                    select: {
                        text: true, // Only include the 'text' field for each task
                    },
                },
            },
            orderBy: {
                user_id: 'asc', // Order users by their 'id' in ascending order
            },
        });


        res.status(200).json({
            message: 'success',
            usersWithTaskTexts
        })
    } catch (error) {
        console.log("users with task", error.message);
        res.status(500).json({
            message: "fail",
            error: error.message
        })
    }
}

exports.updateData = async (req, res) => {
    const { taskText, sourceUserId, targetUserId } = req.body;
    console.log(req.body);

    try {
        // Validate input
        if (!taskText || !sourceUserId || !targetUserId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find the task for the specific user
        const task = await Prisma.task.findFirst({
            where: {
                user_id: parseInt(sourceUserId, 10),
                text: taskText,
            },
        });

        // Check if the task was found
        if (!task) {
            console.log('Task not found');
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if source and target users are different
        if (parseInt(sourceUserId, 10) !== parseInt(targetUserId, 10)) {
            // Create the new task for the target user
            const newTask = await Prisma.task.create({
                data: {
                    user_id: parseInt(targetUserId, 10),
                    text: taskText,
                },
            });

            // Delete the original task
            await Prisma.task.delete({
                where: {
                    task_id: task.task_id,
                },
            });

            console.log('New task created:', newTask);
            res.status(200).json({
                message: 'Task moved successfully',
                newTask,
            });
        } else {
            // If the task is not moved, just respond with success
            res.status(200).json({
                message: 'Task remained with the same user',
            });
        }
    } catch (error) {
        console.error('Error moving task:', error.message);
        res.status(500).json({
            message: 'Failed to move task',
            error: error.message,
        });
    } finally {
        await Prisma.$disconnect();
    }
};
