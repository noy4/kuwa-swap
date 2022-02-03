Moralis.Cloud.define('hey', () => {
  const logger = Moralis.Cloud.getLogger()
  logger.info("C'mon")

  return 'Hey man'
})
