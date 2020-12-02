import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import { PanelEvents } from '@grafana/data';
import _ from 'lodash';
import * as $ from 'jquery';

// Load the events file once when the plugin is loaded since it should rarely change.
$.ajax('public/plugins/grafana-historical-headlines/historical_events.json').done(gotEvents);

let historicalEvents: any = {};

function gotEvents(data: any) {
  historicalEvents = data;
}

export class HistoricalHeadlinesCtrl extends MetricsPanelCtrl {
  static templateUrl = 'partials/module.html';

  panelDefaults = {};

  text = 'Initializing...';

  /** @ngInject */
  constructor($scope: any, $injector: any) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, this.panelDefaults);

    this.events.on(PanelEvents.editModeInitialized, this.onInitEditMode.bind(this));
    this.events.on(PanelEvents.dataReceived, this.onDataReceived.bind(this));
    this.events.on(PanelEvents.dataSnapshotLoad, this.onSnapshowLoad.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/grafana-historical-headlines/partials/options.html', 2);
  }

  onDataReceived(data: any) {
    if (!historicalEvents) {
      this.text = 'Loading events...';
    } else if (data && data.length >= 1) {
      try {
        const points = data[0].datapoints;
        const point = points[points.length - 1];
        const year = Math.round(point[0]);

        if (year in historicalEvents) {
          const events = historicalEvents[year];
          const eventText = events[Math.trunc(Math.random() * events.length)];
          this.text = '' + year + ': ' + eventText;
        } else {
          this.text = '' + year + ': No events available for this year';
        }
      } catch (error) {
        this.text = 'No year available';
      }
    }
    this.render();
  }

  onSnapshowLoad(snapshotData: any) {
    this.onDataReceived(snapshotData);
  }
}

export { HistoricalHeadlinesCtrl as PanelCtrl };
