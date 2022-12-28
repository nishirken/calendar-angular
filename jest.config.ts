import type {Config} from 'jest';

const config: Config = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    transformIgnorePatterns: [
        "!node_modules"
    ],
};

export default config;
