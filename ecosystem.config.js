// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "frontend",
        script: "node_modules/next/dist/bin/next",
        args: "start -p 3000",
        cwd: "/var/www/nwfg",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  