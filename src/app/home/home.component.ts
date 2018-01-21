import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../common/service/language.service';
import 'rxjs/add/operator/first'
import {TreeNode} from '../common/tree-view/tree-view.component';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    public ready = false;

    public nodes: TreeNode[] = [
        new TreeNode(1, 'first', [new TreeNode(2, 'child', [new TreeNode(4, 'grandchild', [])])]),
        new TreeNode(3, 'second', [])
    ];

    constructor(private translateService: TranslateService,
                private languageService: LanguageService) {
        this.languageService.initStaticTranslator(this.translateService).first().subscribe(() => {
            this.ready = true;
        });
    }
}
