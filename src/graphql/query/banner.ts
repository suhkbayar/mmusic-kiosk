import { gql } from '@apollo/client';
import { BANNER_FIELDS } from '../fragment';

export const GET_BANNERS = gql`
  query getBanners($system: BannerSystem!, $types: [BannerType!]) {
    getBanners(system: $system, types: $types) {
      ...BannerFields
    }
  }
  ${BANNER_FIELDS}
`;
