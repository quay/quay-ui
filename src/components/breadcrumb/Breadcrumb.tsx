import {
  Breadcrumb,
  BreadcrumbItem,
  PageBreadcrumb,
} from '@patternfly/react-core';

export function QuayBreadcrumb(props: BreadcrumbProps) {
  return (
    <PageBreadcrumb>
      <Breadcrumb>
        {props.data.map((object, i) => (
          <BreadcrumbItem to={object.to} data-testid={object.id} key={i}>
            {object.title}
          </BreadcrumbItem>
        ))}
        <BreadcrumbItem
          to={props.activeItem.to}
          data-testid={props.activeItem.id}
          isActive
        >
          {props.activeItem.title}
        </BreadcrumbItem>
      </Breadcrumb>
    </PageBreadcrumb>
  );
}

type BreadcrumbProps = {
  // List of page breadcrumbs
  data: {
    title: string;
    id: string;
    to: string;
  }[];
  // Active breadcrumb
  activeItem: {
    title: string;
    id: string;
    to: string;
  };
};
