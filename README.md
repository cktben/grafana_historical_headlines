## Historical headlines

This is a Grafana plugin that shows randomly chosen headlines from the year provided by a data frame.

Think of it as a trivia ticker.

### Building

```
npm install
./node_modules/.bin/grafana-toolkit plugin:build
```

### Collecting Data

The headlines are extracted from Wikipedia pages:

```
./collect_pages
./parse
```

Pages are stored in the pages/ directory by year.  If a file exists, it is not re-downloaded, so collect_pages may be run repeatedly without causing excessive load.

### Installation

Put the source directory in /var/lib/grafana/plugins, or use a symlink.

Restart the Grafana server after first installing the plugin and verify that it is shown on Grafana's home page.
