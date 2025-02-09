import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-usuario-result',
  imports: [NzButtonModule, NzResultModule],
  templateUrl: './usuario-result.component.html',
  styleUrl: './usuario-result.component.css'
})
export class UsuarioResultComponent {

  resultType: 'success' | 'error' = 'success';
  resultTitle: string = '';
  resultMessage: string = '';

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router) {
    this.route.queryParams.subscribe(params => {
      this.resultType = params['type'] || 'success';
      this.resultTitle = params['title'] || '';
      this.resultMessage = params['message'] || '';
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/usuarios/create']);
  }

  navigateBack(): void {
    this.router.navigate(['/home']);
  }
}
