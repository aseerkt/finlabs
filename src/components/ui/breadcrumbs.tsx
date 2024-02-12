import Link from 'next/link';

interface BreadCrumbsProps {
  breadcrumbs: {
    label: string;
    link?: string;
  }[];
}

export default function BreadCrumbs({ breadcrumbs }: BreadCrumbsProps) {
  return (
    <div>
      {breadcrumbs.map((bc, index) => (
        <span key={bc.link}>
          {index > 0 && (
            <span aria-label='separator' className='font-thin'>
              &nbsp;/&nbsp;
            </span>
          )}
          {bc.link ? (
            <Link href={bc.link}>{bc.label}</Link>
          ) : (
            <span>{bc.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
