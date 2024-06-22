const cron = require("node-cron");
const { accountDeletion } = require("../services/accountDeletion.service.js");
const Cronjob = require("../models/Cronjob.model.js");
const { CRONJOB_STATUSES, CRONJOB_TYPES } = require("../config/constants.js");

exports.accountDeletionCron = async (userId) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 4);

  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();

  const cronExpression = `${second} ${minute} ${hour} ${day} ${month + 1} *`;

  const job = cron.schedule(cronExpression, () => {
    accountDeletion(userId);
  });

  await Cronjob.create({
    userId: userId,
    jobType: CRONJOB_TYPES.DELETION,
    job: job,
    status: CRONJOB_STATUSES.PENDING,
  });
};

exports.cancelAccountDeletinoCron = async (userId) => {
  const cronJob = await Cronjob.findOne({
    userId: userId,
    jobType: CRONJOB_TYPES.DELETION,
  });
  if (cronJob) {
    cronJob.job.destroy();
    await Cronjob.findByIdAndUpdate(cronJob._id, {
      status: CRONJOB_STATUSES.CANCELLED,
    });
  }
};
