# Drawby frontend

## setting

> --save styled-components
> react-hook-form
> react-router-dom
> @apollo/client graphql
> react-helmet
> --save @fortawesome/fontawesome-svg-core
> --save @fortawesome/free-solid-svg-icons
> --save @fortawesome/react-fontawesome
> --save @fortawesome/free-brands-svg-icons
> --save @fortawesome/free-regular-svg-icons

## 기억할 것

1. instagram 연동하는법 facebook developers

   [https://developers.facebook.com/docs/permissions/reference/?translation](https://developers.facebook.com/docs/permissions/reference/?translation)

   [instagram_content_publish](https://developers.facebook.com/docs/permissions/reference/instagram_content_publish) 이게 인스타 게시 권한 허락받는거임

   연동하려면 https 주소가 필요하다고 함.

   ngrok 사용하기

   [https://joshua-dev-story.blogspot.com/2020/10/localhost-https-ngrok.html](https://joshua-dev-story.blogspot.com/2020/10/localhost-https-ngrok.html)

페이스북으로 로그인
[https://velog.io/@nomadhash/사이드-프로젝트-리액트에서-카카오-로그인-구현하기](https://velog.io/@nomadhash/%EC%82%AC%EC%9D%B4%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
[https://velog.io/@nomadhash/사이드-프로젝트-리액트에서-페이스북-로그인-구현-하기](https://velog.io/@nomadhash/%EC%82%AC%EC%9D%B4%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%B6%81-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84-%ED%95%98%EA%B8%B0)
[https://nachwon.github.io/insta-facebook/](https://nachwon.github.io/insta-facebook/)

<참고 카카오 로그인>
[https://developers.kakao.com/docs/latest/ko/kakaologin/common](https://developers.kakao.com/docs/latest/ko/kakaologin/common)

- react-facebook-login
  [https://developers.facebook.com/docs/facebook-login/](https://developers.facebook.com/docs/facebook-login/)

2. 인스타에도 글이 자동게시되도록 만들기 (회의때 얘기하자!)

3. React에서 .env 사용하는 방법

```jsx
// .env
REACT_APP_BLABLA = blabla;

// code 에서 활용
process.env.REACT_APP_BLABLA;
```

4. frontend에서 api key 숨기기

기본적으로 숨기는게 불가능

> > 대신에 개발할때는 그냥 env파일 안에서 변수로 사용해도 됨

gitignore에 env 추가해서 서버에 올릴때(ex. Netlify) 서버리스로 구성해서
API 환경변수를 거기서 관리해주면 된다고 함

## To do

- [ ] social login mutation 바꾸기 (무조건 social id만 가지고 로그인을 진행한다. 보낼때는 "platform" + socialId 로 보내기)
- [x] social login (FACEBOOK)
- [ ] social login (KAKAO, GOOGLE)
- [ ] Feed 구성
