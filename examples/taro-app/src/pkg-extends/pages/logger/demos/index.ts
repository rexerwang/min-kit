export const UsageSnippet = `import { getLogger, logger } from '@min-kit/extends'

/**
 * Basic Usage
 */

// output error message with \`user\` filter
logger.error('#user', new Error('not found user info'))
// output warn message
logger.warn('#user', 'not member', { id: '1234' })
// output info message and report
logger.info('#user', { id: '1234' }).report()
// output debug message
logger.debug('#user', userInfo)

/**
 * set option of logger instance
 */
logger.setOption({
  reporter: { feedback: true },
  timestamp: true,
})

/**
 * create Logger instance with customizing option
 */
const userLogger = getLogger('user', {
  reporter: {
    realtime: false,
    feedback: false,
    // custom reporter
    async custom(log) {
      // do upload logs
      await http.post('/logs', log)
    },
  },
})

// always report
userLogger.error('#NotFound', new Error('not found user info'))
// warn & report
userLogger.warn('#NotMember',userId, new Error('not member')).report()

`
