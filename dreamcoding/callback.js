'use strict';

// JavaScript is synchronous. JS는 동기적이다.
// Execute the code block by orger after hoisting. 호스팅 후에 코드를 처리
// Hoising : var, function declaration. 변수, 함수 선언을 의미


// synchronous callback
function printImmediately(print) {
    print();
}
// Asynchronous callback
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}

console.log('1') // 동기
setTimeout(() => console.log('2'), 1000); // 비동기
console.log('3') // 동기



printImmediately(() => console.log('hello')); // 동기
printWithDelay(() => console.log('async callback'), 2000); // 비동기

// Callback Hell example
// 가독성이 매우 떨어짐
// 콜백 체인이 길수록, 디버깅하고 문제를 파악하는데 어려움이 있음.
// 코드 유지 보수가 어려움.
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not fount'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie') {
                onSuccess({ name: 'ellie', role: 'admin' });
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const userStorage = new UserStorage()
const id = prompt('enter your id')
const password = prompt('enter your password')
userStorage.loginUser(
    id,
    password,
    user => {
        userStorage.getRoles(
            user,
            (userWithRole) => {
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
                );
            },
            error => {
                console.log(error);
            }
        );
    },
    error => {
        console.log(error);
    }
);
