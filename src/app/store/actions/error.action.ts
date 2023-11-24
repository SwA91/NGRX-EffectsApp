import { createAction, props } from '@ngrx/store';

export const showError = createAction(
    '[ERROR Component] showError',
    props<{ payload: any }>()
);
export const hideError = createAction('[ERROR Component] hideError');