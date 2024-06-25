const cron = require("node-cron");
const { accountDeletion } = require("../services/accountDeletion.service.js");
const Cronjob = require("../models/Cronjob.model.js");
const { CRONJOB_STATUSES, CRONJOB_TYPES } = require("../config/constants.js");

exports.accountDeletionCron = async (userId) => {
  try {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 4);

    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();

    const cronExpression = `${second} ${minute} ${hour} ${day} ${month + 1} *`;

    const taskName = `${CRONJOB_TYPES.DELETION}_${userId}_${Date.now()}`;
    const task = cron.schedule(
      cronExpression,
      () => {
        accountDeletion(userId);
      },
      {
        scheduled: true,
        name: taskName,
      }
    );

    console.log("JOB:", task);

    await Cronjob.create({
      userId: userId,
      taskName: taskName,
      jobType: CRONJOB_TYPES.DELETION,
      status: CRONJOB_STATUSES.PENDING,
    });

    const taskFromDb = await Cronjob.findOne({
      userId: userId,
      jobType: CRONJOB_TYPES.DELETION,
    });

    const myTask = cron.getTasks(taskFromDb.id);
    console.log("TASKS: ", tasks);
  } catch (error) {
    console.log("In side cron job:", error);
  }
};

exports.getAllTasks = async () => {
  const tasks = cron.getTasks();
  console.log("TASKS: ", tasks);
};

exports.cancelAccountDeletinoCron = async (userId) => {
  const cronJob = await Cronjob.findOne({
    userId: userId,
    jobType: CRONJOB_TYPES.DELETION,
  });
  console.log(cronJob);
  if (cronJob) {
    cronJob.job.destroy();
    return await Cronjob.findByIdAndUpdate(cronJob._id, {
      status: CRONJOB_STATUSES.CANCELLED,
    });
  }
};
