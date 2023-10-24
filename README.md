![title](./docs/title.png)

# 2023 우아한테크코스 5기 카페인 팀

<p align="center">
  <img src="./frontend/public/icons/192.png"/>
</p>
<p align="center" style="font-size: larger;">
  <a href="https://carffe.in">카페인 바로가기</a>
</p>
<p align="center" style="font-size: xx-small;">
  실시간 전기자동차 충전소 지도 및 사용 통계 조회 서비스
</p>

## 프로젝트 소개

카페인 서비스는 전국 24만개의 충전기 정보를 실시간으로 제공하고, 각 충전소의 혼잡도 정보를 제공함으로써 전기차 사용자들의 자발적인 분산 이용을 유도하는 서비스 입니다.

<br>

### 설치할 필요가 없습니다.

이 서비스는 웹 브라우저만 있다면 설치하지 않아도 구동할 수 있습니다. PC와 모바일 모두 대응하며, 앱 환경에서 사용을 원하시는 경우 브라우저에서 `홈 화면에 바로가기 추가`를 눌러 사용할 수 있습니다.

<br>

### 기존의 웹 서비스를 대체합니다.

기존에 출시된 전기자동차 충전소 조회 웹 서비스들은 굉장히 느리고 불편합니다. 카페인에서는 `사용자 경험을 네이티브 앱 환경만큼 크게 개선`하였습니다. 전국 충전소를 검색할 수 있는 것은 물론이고, 원하시는 지역을
검색하여 바로 이동할 수도 있습니다.

<br>

### 충전소 사용량을 통계로 제공합니다.

충전소의 상세한 정보를 제공하는 것은 물론이고, 지속적으로 수집한 충전기 사용량을 통계로 제공합니다. 충전소가 얼마나 인기있는 충전소인지 확인할 수 있습니다.

<br>

### 충전소 평가 및 고장 신고

정보가 잘못된 충전소는 운전자를 당황하게 합니다. 평소에 관리가 잘 되고 있는 충전소인지 확인할 수 있습니다.

<br>

## 주요 기능 소개

### 충전소 조회

- 지도
    - 마커
      ![station_marker_big](./docs/station_marker_big.png)
      ![station_marker](./docs/station_marker.png)
      ![cluster_region](./docs/cluster_region.png)
      ![cluster_city](./docs/cluster_city.png)

    - 충전소 필터링
      ![filter_server](./docs/filter_server.gif)

    - 검색
      ![search](./docs/search.gif)
        - 전국의 충전소와 도시 검색이 가능합니다.

### 충전소 정보 조회

- 마커를 통한 간단한 정보 조회
  ![station_info](./docs/station_info.png)
- 상세정보
    - 충전소 정보
      ![station_details](./docs/station_details.png)
    - 충전기 개별 상태
      ![station_chargers](./docs/station_chargers.png)
    - 혼잡도
      ![statistics](./docs/statistics.png)
    - 충전소/충전기 신고
      ![reports](./docs/reports.png)
    - 후기
      ![reviews](./docs/reviews.png)

### 지원 플랫폼

<table>
  <tr>
    <td align="center">
        <img src="./docs/pc.png" alt="가브리엘(윤주현) 프로필" />
    </td>
    <td align="center">
        <img src="./docs/mobile.png" alt="센트(김영우) 프로필" />
    </td>
  </tr>
  <tr>
    <td align="center">
        PC
    </td>
    <td align="center">
        Mobile
    </td>
  </tr>
</table>

## 프로젝트 구조

- CI/CD
    - GitHub Actions
    - Docker
- 기술
    - Frontend
        - React + Typescript
        - Tanstack Query
        - Google Maps API
        - webpack
        - styled-components
        - Storybook
        - Jest
        - React Testing Library
        - Eslint / Prettier
        - GitHub Actions
        - AWS S3 (예정)
        - AWS CloudFront (예정)
    - Backend
        - ?

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
