/*=============================================================================
#
# Copyright (C) 2018 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2018-01-25 10:27
#
# Description:	
#
=============================================================================*/

const tsImportPluginFactory = require('ts-import-plugin');
const { getLoader  } = require('react-app-rewired');

module.exports = function override(config, env) {
    const tsLoader = getLoader(config.module.rules, rule => rule.loader &&
        typeof rule.loader === 'string' && rule.loader.includes('ts-loader'));

    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css',
                      
            })]
        })
    };

    return config;
};
