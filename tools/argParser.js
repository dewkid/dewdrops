function setPassword(argv) {
  const args = argv.filter(value => value.startsWith('--password='));
  if (args.length == 1) {
    let passwordArg = args[0];
    process.env.DB_PASSWORD = passwordArg.substring(11);
  }
  if (!process.env.DB_PASSWORD || process.env.DB_PASSWORD.length == 0) {
    console.log('--password=xxxx argument is required');
    process.exit(1);
  }
}

module.exports = {
  setPassword
};
