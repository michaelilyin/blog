import {OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {ComponentType} from '@angular/cdk/portal';
import {Router} from '@angular/router';

export abstract class BottomSheetBaseComponent<T> implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.bottomSheet.open(this.componentType)
        .afterDismissed()
        .subscribe(() => {
          this.router.navigate([{
            outlets: {
              'bottom-sheet': null
            }
          }]);
        });
    });
  }

  protected abstract get bottomSheet(): MatBottomSheet;

  protected abstract get router(): Router;

  protected abstract get componentType(): ComponentType<T>;
}
