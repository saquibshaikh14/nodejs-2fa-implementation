/**
 * author Saquib Shaikh
 * created on 29-12-2024-02h-00m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import { toast as baseToast, ToastOptions } from 'react-hot-toast';

export const extendedToast = {
    success: (message: string, option: ToastOptions = {}) => {
        baseToast.success(message, {
            ...option,
            style: { cursor: 'pointer' },
            className: 'twoFAToastDismiss'
        });
        setTimeout(() => {
            document.querySelector('.twoFAToastDismiss')?.addEventListener('click', dismissToast);
        }, 200)
    },
    error: (message: string, option: ToastOptions = {}) => {
        baseToast.error(message, {
            ...option,
            style: { cursor: 'pointer' },
            className: 'twoFAToastDismiss',
        });
        setTimeout(() => {
            document.querySelector('.twoFAToastDismiss')?.addEventListener('click', dismissToast);
        }, 200)
    }
};

function dismissToast(e: Event) {
    baseToast.dismiss();
    e.target?.removeEventListener('click', dismissToast);
}