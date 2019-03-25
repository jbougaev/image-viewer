import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerOriginalComponent } from './image-viewer-original.component';

describe('ImageViewerOriginalComponent', () => {
  let component: ImageViewerOriginalComponent;
  let fixture: ComponentFixture<ImageViewerOriginalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageViewerOriginalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewerOriginalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
