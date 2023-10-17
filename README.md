# 2023 우아한테크코스 5기 카페인 팀

<p align="center">
  실시간 전기자동차 충전소 지도 및 사용 통계 조회 서비스
</p>
<p align="center">
  <img src="./frontend/public/icons/192.png"/>
</p>
<p align="center">
  <a href="https://carffe.in">카페인 바로가기</a>
</p>

## 프로젝트 소개

카페인 서비스는 전국 24만개의 충전기 정보를 실시간으로 제공하고, 각 충전소의 혼잡도 정보를 제공함으로써 전기차 사용자들의 자발적인 분산 이용을 유도하는 서비스 입니다.

### 설치할 필요가 없습니다. 

이 서비스는 웹 브라우저만 있다면 설치하지 않아도 구동할 수 있습니다. PC와 모바일 모두 대응하며, 앱 환경에서 사용을 원하시는 경우 브라우저에서 `홈 화면에 바로가기 추가`를 눌러 사용할 수 있습니다.

### 기존의 웹 서비스를 대체합니다.
기존에 출시된 전기자동차 충전소 조회 웹 서비스들은 굉장히 느리고 불편합니다. 카페인에서는 `사용자 경험을 네이티브 앱 환경만큼 크게 개선`하였습니다.

### 충전소 사용량을 통계로 제공합니다.
충전소의 상세한 정보를 제공하는 것은 물론이고, 지속적으로 수집한 충전기 사용량을 통계로 제공합니다. 충전소가 얼마나 인기있는 충전소인지 확인할 수 있습니다.

### 충전소 평가 및 고장 신고
정보가 잘못된 충전소는 운전자를 당황하게 합니다. 평소에 관리가 잘 되고 있는 충전소인지 확인할 수 있습니다.

## 주요 기능 소개

```json
사진(png or gif) + 기능 설명
```

- 충전소 조회
  - 지도
    - 마커
      - 줌 레벨 따라 다르게 보이는 마커 상태
      - 영역 제한을 통한 서버 보호
    - 준상세정보
    - 클라이언트 필터링
      - 외부인개방
      - 급속
      - 현재사용가능
      - 주차비 무료
    - 검색
      - 도시검색
      - 충전소+주소 검색
  - 충전소 정보 조회
    - 간단정보
    - 상세정보
      - 충전소 정보
      - 충전기 개별 상태
      - 혼잡도
      - 충전소 신고
      - 충전기 신고
      - 후기
        - 별점
        - 댓글
        - 답글
  - 서버 필터링
    - 단자, 속도, 회사
    - 차량 별 필터링 메뉴 (개방)

## 프로젝트 구조

- CI/CD
- 사용한 기술?

## 팀원 소개

### Frontend

<table>
  <tr>
    <td align="center" width="200px">
      <a href="https://github.com/gabrielyoon7" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/69189073?v=4" alt="가브리엘(윤주현) 프로필" />
      </a>
    </td>
    <td align="center" width="200px">
      <a href="https://github.com/kyw0716" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/77326660?v=4" alt="센트(김영우) 프로필" />
      </a>
    </td>
    <td align="center" width="200px">
      <a href="https://github.com/feb-dain" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/108778921?v=4" alt="야미(이다인) 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/gabrielyoon7" target="_blank">
        가브리엘(윤주현)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/kyw0716" target="_blank">
        센트(김영우)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/feb-dain" target="_blank">
        야미(이다인)
      </a>
    </td>
  </tr>
</table>

### Backend

<table>
  <tr>
    <td align="center" width="200px">
      <a href="https://github.com/be-student" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/80899085?v=4" alt="누누(송은우) 프로필" />
      </a>
    </td>
    <td align="center" width="200px">
      <a href="https://github.com/drunkenhw" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/106640954?v=4" alt="박스터(한우석) 프로필" />
      </a>
    </td>
    <td align="center" width="200px">
      <a href="https://github.com/sosow0212" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/63213487?v=4" alt="제이(이재윤) 프로필" />
      </a>
    </td>
    <td align="center" width="200px">
      <a href="https://github.com/kiarakim" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/101039161?v=4" alt="키아라(김도희) 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/be-student" target="_blank">
        누누(송은우)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/drunkenhw" target="_blank">
        박스터(한우석)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sosow0212" target="_blank">
        제이(이재윤)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/kiarakim" target="_blank">
        키아라(김도희)
      </a>
    </td>
  </tr>
</table>

## 사용자 유치 전략

- 모집 시도
- 방문자 수 통계

## 더보기

- 팀 블로그
