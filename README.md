[高级 Grunt 用法 | Screeps 中文文档 (screeps-cn.github.io)](https://screeps-cn.github.io/contributed/advanced_grunt.html)

1. `npm install -g grunt-cli`安装grunt
2. `npm install grunt-screeps`安装screeps插件
3. 配置`.screeps.json`.

```json
{
  "email": "<YOUR EMAIL HERE>",
  "password": "<YOUR PASSWORD HERE>",
  "branch": "default",
  "ptr": false
}
```

4. 配置`gruntfile.js`.

```js
module.exports = function(grunt) {

    var config = require('./.screeps.json')
    var branch = grunt.option('branch') || config.branch;
    var email = grunt.option('email') || config.email;
    var password = grunt.option('password') || config.password;
    var ptr = grunt.option('ptr') ? true : config.ptr

    grunt.loadNpmTasks('grunt-screeps')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')

    grunt.initConfig({
        screeps: {
            options: {
                email: email,
                password: password,
                branch: branch,
                ptr: ptr
            },
            dist: {
                src: ['dist/*.js']
            }
        },

        // 移除 dist 文件夹中的所有文件。
        clean: {
          'dist': ['dist']
        },

        // 将所有源文件复制到 dist 文件夹中并展平文件夹结构
        copy: {
          // 将游戏代码推送到dist文件夹，以便在将其发送到 screeps 服务器之前可以对其进行修改。
          screeps: {
            files: [{
              expand: true,
              cwd: 'src/',
              src: '**',
              dest: 'dist/',
              filter: 'isFile',
              rename: function (dest, src) {
                // 通过将文件夹分隔符替换成下划线来重命名文件
                return dest + src.replace(/\//g,'_');
              }
            }],
          }
        },
    })

    grunt.registerTask('default',  ['clean', 'copy:screeps', 'screeps']);
}
```

5. 在`.gitignore`中加入`.screeps.json`.

6. `grunt screeps --ptr=true --branch=development`加入分支
7. `npm install grunt-contrib-clean --save-dev npm install grunt-contrib-copy --save-dev`使用文件夹
8. 代码中将目录分隔符(斜杠)转换为下划线

| 之前                       | 之后                        | 要求（代码里要提前这么写好）    |
| :------------------------- | :-------------------------- | :------------------------------ |
| src/main.js                | dist/main.js                | require('main');                |
| src/lib/creeptalk.js       | dist/lib_creeptalk.js       | require('lib_creeptalk');       |
| src/lib/creeptalk/emoji.js | dist/lib_creeptalk_emoji.js | require('lib_creeptalk_emoji'); |
| src/prototypes/creeps.js   | dist/prototypes_creeps.js   | require('prototypes_creeps');   |
| src/prototypes/spawns.js   | dist/prototypes_spawns.js   | require('prototypes_spawns');   |

9. `grunt`只需要一条简单的命令，就可以将您的代码从 `src` 文件夹中复制出来，展平，并推送到 screeps 服务器。