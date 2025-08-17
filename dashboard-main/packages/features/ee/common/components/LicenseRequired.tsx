import DOMPurify from "dompurify";
import { useSession } from "next-auth/react";
import type { AriaRole, ComponentType } from "react";
import React, { Fragment } from "react";

import { APP_NAME, CONSOLE_URL, SUPPORT_MAIL_ADDRESS, WEBAPP_URL } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { EmptyScreen } from "@calcom/ui";
import { AlertTriangle } from "@calcom/ui/components/icon";

import { Footer } from "../../../../../apps/web/components/layouts/Footer";
import { Header } from "../../../../../apps/web/components/layouts/Header";

type LicenseRequiredProps = {
  as?: keyof JSX.IntrinsicElements | "";
  className?: string;
  role?: AriaRole | undefined;
  children: React.ReactNode;
};

const LicenseRequired = ({ children, as = "", ...rest }: LicenseRequiredProps) => {
  const session = useSession();
  const { t } = useLocale();
  const Component = as || Fragment;
  const hasValidLicense = session.data ? session.data.hasValidLicense : null;

  return (
    <div className="container">
      <Header />
      <Component {...rest}>
        {hasValidLicense === null || hasValidLicense ? (
          children
        ) : (
          <EmptyScreen
            Icon={AlertTriangle}
            headline={t("enterprise_license")}
            description={
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    t("enterprise_license_description", {
                      consoleUrl: `<a href="${CONSOLE_URL}" target="_blank" rel="noopener noreferrer" class="underline">
                ${APP_NAME}
              </a>`,
                      setupUrl: `<a href="${WEBAPP_URL}/auth/setup" class="underline">/auth/setup</a>`,
                      supportMail: `<a href="mailto:${SUPPORT_MAIL_ADDRESS}" class="underline">
                ${SUPPORT_MAIL_ADDRESS}</a>`,
                    })
                  ),
                }}
              />
            }
          />
        )}
      </Component>
      <Footer />
    </div>
  );
};

export const withLicenseRequired =
  <T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) =>
  // eslint-disable-next-line react/display-name
  (hocProps: T) =>
    (
      <LicenseRequired>
        <Component {...hocProps} />
      </LicenseRequired>
    );

export default LicenseRequired;
