import { getDefaultConfig } from 'expo/metro-config';
import exclusionList from 'metro-config/src/defaults/exclusionList.js';

const config = getDefaultConfig(process.cwd());
const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
  blockList: exclusionList([
    /.*\/__tests__\/.*/,
    /.*\/__mocks__\/.*/,
    /.*\.test\.[jt]sx?$/,
    /.*\.spec\.[jt]sx?$/,
  ]),
};

export default config;
