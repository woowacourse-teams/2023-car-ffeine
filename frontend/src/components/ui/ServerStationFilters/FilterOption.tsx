import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

interface FilterSectionProps {
  title: string;
  filterOptions: string[];
  filterButtonVariant?: 'xs' | 'sm';
}

const FilterSection = ({
  title,
  filterOptions,
  filterButtonVariant = 'xs',
}: FilterSectionProps) => {
  return (
    <FlexBox width={27} direction={'column'}>
      <Text variant={'h6'} mb={1}>
        {title}
      </Text>
      <FlexBox>
        {filterOptions.map((filterOption, index) => (
          <Button key={index} size={filterButtonVariant} outlined={true}>
            {filterOption}
          </Button>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default FilterSection;
