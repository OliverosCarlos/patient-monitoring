import { Injectable } from '@angular/core';

import { PsychologistListViewComponent } from 'src/app/components/administration/psychologist/psychologist-list-view/psychologist-list-view.component';
import { AdItem } from 'src/app/utils/components/ad-item';

import {EmotionFormViewComponent} from 'src/app/components/catalogs/emotions/emotion-form-view/emotion-form-view.component';
import {EmotionListViewComponent} from 'src/app/components/catalogs/emotions/emotion-list-view/emotion-list-view.component';
import {EmotionShowViewComponent} from 'src/app/components/catalogs/emotions/emotion-show-view/emotion-show-view.component';
import {EmotionUpdateViewComponent} from 'src/app/components/catalogs/emotions/emotion-update-view/emotion-update-view.component';


@Injectable()
export class AdService {
  getAds() {
    return [
      new AdItem(EmotionFormViewComponent,'emotion','form',{}),
      new AdItem(EmotionListViewComponent,'emotion','list',{}),
      new AdItem(EmotionShowViewComponent,'emotion','show',{}),
      new AdItem(EmotionUpdateViewComponent,'emotion','update',{})
    ];
  }
}
