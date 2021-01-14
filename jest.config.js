module.exports = {
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  setupFilesAfterEnv: ['./test/setup.ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: './svelte.config.js'
      }
    ]
  }
};
