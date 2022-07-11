import {
  Breadcrumb,
  BreadcrumbItem,
  PageBreadcrumb,
} from '@patternfly/react-core';
import {IBreadcrumb} from 'src/resources/BreadcrumbResource';

export function QuayBreadcrumb(props: BreadcrumbProps) {
  return (
    <PageBreadcrumb>
      <Breadcrumb>
        {props.breadcrumbItems.map((object, i) => (
          <BreadcrumbItem
            to={object.to}
            data-testid={object.id}
            key={i}
            isActive={object.active}
          >
            {object.title}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </PageBreadcrumb>
  );
}

type BreadcrumbProps = {
  breadcrumbItems: IBreadcrumb[];
};
