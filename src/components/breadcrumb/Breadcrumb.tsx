import {
  Breadcrumb,
  BreadcrumbItem,
  PageBreadcrumb,
} from '@patternfly/react-core';
import {IBreadcrumb} from 'src/resources/BreadcrumbResource';
import {Link} from 'react-router-dom';

export function QuayBreadcrumb(props: BreadcrumbProps) {
  return (
    <PageBreadcrumb>
      <Breadcrumb>
        {props.breadcrumbItems.map((object, i) => (
          <BreadcrumbItem
            render={(props) => (
              <Link to={object.to} data-testid={object.id}>
                {object.title}
              </Link>
            )}
            key={i}
            isActive={object.active}
          />
        ))}
      </Breadcrumb>
    </PageBreadcrumb>
  );
}

type BreadcrumbProps = {
  breadcrumbItems: IBreadcrumb[];
};
