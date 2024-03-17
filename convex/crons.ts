import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "Delete any old file mark for deleting ",
  { minutes: 1 }, // every minute
  internal.files.deleteAllFiles
);

export default crons;
