import { ComputedRef, Ref } from 'vue';
import { MatchedKeyword, SearchMatcher } from '@/types/filtering';

enum AssetFilterKeys {
  SYMBOL = 'symbol',
  NAME = 'name'
}

enum AssetFilterValueKeys {
  SYMBOL = 'symbol',
  NAME = 'name'
}

type Matcher = SearchMatcher<AssetFilterKeys, AssetFilterValueKeys>;
type Filters = MatchedKeyword<AssetFilterValueKeys>;

export const useAssetFilter = () => {
  const filters: Ref<Filters> = ref({});

  const { tc } = useI18n();

  const matchers: ComputedRef<Matcher[]> = computed(() => [
    {
      key: AssetFilterKeys.SYMBOL,
      keyValue: AssetFilterValueKeys.SYMBOL,
      description: tc('assets.filter.symbol'),
      suggestions: () => [],
      hint: tc('assets.filter.symbol_hint'),
      validate: () => true
    },
    {
      key: AssetFilterKeys.NAME,
      keyValue: AssetFilterValueKeys.NAME,
      description: tc('assets.filter.name'),
      suggestions: () => [],
      hint: tc('assets.filter.name_hint'),
      validate: () => true
    }
  ]);

  const updateFilter = (newFilters: Filters) => {
    set(filters, newFilters);
  };

  return {
    filters,
    matchers,
    updateFilter
  };
};