import Link from 'next/link';
import React, { useState } from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { isCommerceEnabled } from '../../helpers/CommerceHelper';
import { useI18n } from 'next-localization';
import PreviewSearchWidget from '../PreviewSearchContent/PreviewSearchContent';
import { isSearchSDKEnabled } from '../../services/SearchSDKService';

export type MainNavigationProps = ComponentProps & {
  fields: {
    data: {
      item: {
        headerLogo: {
          jsonValue: ImageField;
          alt: string;
        };
      };
      links: {
        children: {
          results: [
            {
              displayName: string;
              field: {
                jsonValue: {
                  value: {
                    anchor: string;
                    href: string;
                    linktype: string;
                    target: string;
                    text: string;
                    url: string;
                  };
                };
              };
            }
          ];
        };
      };
    };
  };
};

const MainNavigation = (props: MainNavigationProps): JSX.Element => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { t } = useI18n();

  const sxaStyles = `${props.params?.styles || ''}`;

  const shopLink = isCommerceEnabled && (
    <li className="text-menu-item">
      <Link href="/shop">Shop</Link>
    </li>
  );

  return (
    <nav className={`main-navigation ${sxaStyles}`}>
      <div className="navigation-content">
        <div className="controls-container container">
          <Link href="/" className="logo-link">
            <Image
              field={props.fields.data.item.headerLogo.jsonValue}
              alt={props.fields.data.item.headerLogo.alt}
            />
          </Link>
          <button
            className="items-toggle"
            aria-label="open menu"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className={'items-container' + (navbarOpen ? ' opened' : ' closed')}>
          <ul className="container">
            {props.fields?.data?.links?.children?.results?.map((item, index) => (
              <li className="text-menu-item" key={index}>
                <Link href={item.field?.jsonValue?.value?.href ?? '#'} prefetch={false}>
                  {item.displayName}
                </Link>
              </li>
            ))}
            {shopLink}
            <li className="button-menu-item">
              <Link href="/tickets" className="btn-main">
                {t('Get a Quote') || 'Get a Quote'}
              </Link>
            </li>
          </ul>
          {isSearchSDKEnabled && (
            <div className="search-input-container">
              <PreviewSearchWidget rfkId="rfkid_6" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Default = MainNavigation;
