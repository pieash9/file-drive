import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "Delete any old file mark for deleting ",
  { hours: 72 }, // every hours
  internal.files.deleteAllFiles
);

export default crons;
