import 'zone.js';
import 'zone.js/testing';
import {getTestBed, TestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

beforeEach(() => {
  TestBed.overrideProvider('Icons Token', { useValue: {}})
})