import 'zone.js';
import {getTestBed, TestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {InjectionToken} from "@angular/core";
import {NgIconsToken} from "@ng-icons/core";

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

beforeEach(() => {
  TestBed.overrideProvider('Icons Token', { useValue: {}})
})