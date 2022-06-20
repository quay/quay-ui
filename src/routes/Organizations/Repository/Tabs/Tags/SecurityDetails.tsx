import {useEffect, useState} from 'react';
import {
  SecurityDetailsResponse,
  // getSecurityDetails,
  Data,
  Vulnerability,
} from 'src/resources/TagResource';
import React from 'react';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ExpandableRowContent,
} from '@patternfly/react-table';
import {TextContent, TextVariants, Text} from '@patternfly/react-core';

const columnNames = {
  advisory: 'Advisory',
  severity: 'Severity',
  package: 'Package',
  currentVersion: 'Current Version',
  fixedInVersion: 'Fixed in Version',
};

export default function SecurityDetails(props: SecurityDetails) {
  const [status, setStatus] = useState<string>('');
  const [data, setData] = useState<Data>(null);
  const [expandedRepoNames, setExpandedRepoNames] = React.useState<string[]>(
    [],
  );

  useEffect(() => {
    (async () => {
      try {
        // For now, we mock the request
        // const securityDetails: SecurityDetailsResponse =
        //   await getSecurityDetails(props.org, props.repo, props.digest);
        // setStatus(securityDetails.status);
        setStatus(mockData.status);
        setData(mockData.data);
      } catch (error: any) {
        console.log('Unable to get security details: ', error);
      }
    })();
  }, []);

  const setRepoExpanded = (vulnerability: Vulnerability, isExpanding = true) =>
    setExpandedRepoNames((prevExpanded) => {
      const otherExpandedRepoNames = prevExpanded.filter(
        (r) => r !== vulnerability.Name,
      );
      return isExpanding
        ? [...otherExpandedRepoNames, vulnerability.Name]
        : otherExpandedRepoNames;
    });
  const isRepoExpanded = (vulnerability: Vulnerability) =>
    expandedRepoNames.includes(vulnerability.Name);

  const getDistro = function (vuln: Vulnerability) {
    if (vuln.Metadata.DistroName) {
      return vuln.NamespaceName.split(':', 1);
    }
    return 'Unknown';
  };

  const getSeverityTooltip = function (vuln: Vulnerability) {
    const distro = getDistro(vuln);

    let result =
      'Note: This vulnerability was originally given a CVSSv3 score of ' +
      vuln.Metadata.NVD.CVSSv3.Score +
      ' by NVD';

    if (vuln.Severity != 'Unknown') {
      result =
        result + ', but was subsequently reclassifed as a ' + vuln.Severity;
    }

    if (distro != 'Unknown') {
      result = result + ' issued by ' + distro;
    }
    return result;
  };

  if (!status) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <TableComposable aria-label="Expandable table" variant={'compact'}>
        <Thead>
          <Tr>
            <Th />
            <Th>{columnNames.advisory}</Th>
            <Th>{columnNames.severity}</Th>
            <Th>{columnNames.package}</Th>
            <Th>{columnNames.currentVersion}</Th>
            <Th>{columnNames.fixedInVersion}</Th>
          </Tr>
        </Thead>
        {data.Layer.Features.map((feature, rowIndex) => {
          if (!feature.Vulnerabilities || feature.Vulnerabilities.length == 0) {
            return null;
          }
          const packageName = feature.Name;
          const packageVersion = feature.Version;
          return feature.Vulnerabilities.map((vulnerability) => {
            return (
              <Tbody
                key={vulnerability.Name}
                isExpanded={isRepoExpanded(vulnerability)}
              >
                <Tr>
                  <Td
                    expand={{
                      rowIndex,
                      isExpanded: isRepoExpanded(vulnerability),
                      onToggle: () =>
                        setRepoExpanded(
                          vulnerability,
                          !isRepoExpanded(vulnerability),
                        ),
                    }}
                  />
                  <Td dataLabel={columnNames.advisory}>{vulnerability.Name}</Td>
                  <Td dataLabel={columnNames.severity}>
                    {vulnerability.Severity}
                  </Td>
                  <Td dataLabel={columnNames.package}>{packageName}</Td>
                  <Td dataLabel={columnNames.currentVersion}>
                    {packageVersion}
                  </Td>
                  <Td dataLabel={columnNames.fixedInVersion}>
                    {vulnerability.FixedBy}
                  </Td>
                </Tr>

                <Tr isExpanded={isRepoExpanded(vulnerability)}>
                  <Td />
                  <Td dataLabel="Repo detail 1" colSpan={5} cellPadding="span">
                    <ExpandableRowContent>
                      <TextContent style={{paddingRight: '30px'}}>
                        <Text component={TextVariants.p}>Severity Note</Text>
                        <Text component={TextVariants.small}>
                          {getSeverityTooltip(vulnerability)}
                        </Text>

                        <Text component={TextVariants.p}>Vectors</Text>
                        <TableComposable
                          aria-label="Vulnerabilities"
                          variant="compact"
                        >
                          <Thead cellPadding={'5px'}>
                            <Tr
                              marginWidth={0}
                              className="pf-u-text-align-left"
                            >
                              {vulnerability.Metadata.NVD.CVSSv3.Vectors.split(
                                '/',
                              )
                                .slice(1)
                                .map((vector, i) => {
                                  return (
                                    <Th key={i}>
                                      {NVD_VECTORS[vector.split(':')[0]]?.title}
                                    </Th>
                                  );
                                })}
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              {vulnerability.Metadata.NVD.CVSSv3.Vectors.split(
                                '/',
                              )
                                .slice(1)
                                .map((vector, i) => {
                                  const vectorType = vector.split(':')[0];
                                  const vectorValue = vector.split(':')[1];

                                  return (
                                    <Th key={i}>
                                      <i className="fa fa-exclamation-circle"></i>{' '}
                                      {
                                        NVD_VECTORS[vectorType].values.filter(
                                          (value) => value.id == vectorValue,
                                        )[0].title
                                      }
                                    </Th>
                                  );
                                })}
                            </Tr>
                          </Tbody>
                        </TableComposable>
                        {vulnerability.Description && (
                          <>
                            <Text component={TextVariants.p}>Description</Text>
                            <Text component={TextVariants.small}>
                              {vulnerability.Description}
                            </Text>
                          </>
                        )}
                      </TextContent>
                    </ExpandableRowContent>
                  </Td>
                </Tr>
              </Tbody>
            );
          });
        })}
      </TableComposable>
    </>
  );
}

export interface SecurityDetails {
  org: string;
  repo: string;
  digest: string;
}

const mockData = {
  status: 'scanned',
  data: {
    Layer: {
      Name: 'sha256:a86508918ea51da557037edb30cef2a2768fe3982448a23b969a5066bf888940',
      ParentName: '',
      NamespaceName: '',
      IndexedByVersion: 4,
      Features: [
        {
          Name: 'p11-kit-trust',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.23.22-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-ethtool',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.14-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pysocks',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.6.8',
          Vulnerabilities: [],
        },
        {
          Name: 'libsmartcols',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus-tools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'libdnf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.55.0-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'acl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.2.53-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libpcap',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '14:1.9.1-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-gpg',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.13.1-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'socat',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '1.7.3.3-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gawk',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.2.1-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pip',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '9.0.3',
          Vulnerabilities: [
            {
              Severity: 'High',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'The pip package before 19.2 for Python allows Directory Traversal when a URL is given in an install command, because a Content-Disposition header can have ../ in a filename, as demonstrated by overwriting the /root/.ssh/authorized_keys file. This occurs in _download_http_url in _internal/download.py.',
              Name: 'pyup.io-38765 (CVE-2019-20916)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N',
                    Score: 7.5,
                  },
                },
              },
            },
            {
              Severity: 'Medium',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'Pip version 21.1 updates its dependency "urllib3" to 1.26.4 to fix CVE-2021-28363.',
              Name: 'pyup.io-40291 (CVE-2021-28363)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N',
                    Score: 6.5,
                  },
                },
              },
            },
            {
              Severity: 'Unknown',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'Pip version 21.1 stops splitting on unicode separators in git references, which could be maliciously used to install a different revision on the repository. \r\nhttps://github.com/pypa/pip/issues/9827',
              Name: 'pyup.io-42218 (PVE-2021-42218)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {CVSSv3: {Vectors: '', Score: ''}},
              },
            },
            {
              Severity: 'Medium',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                "Pip version 21.1 updates its dependency 'urllib3' to v1.26.4 to include a security fix.",
              Name: 'pyup.io-40291 (CVE-2021-28363)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N',
                    Score: 6.5,
                  },
                },
              },
            },
            {
              Severity: 'Medium',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'Pip version 21.1 includes a fix for CVE-2021-3572: A flaw was found in python-pip in the way it handled Unicode separators in git references. A remote attacker could possibly use this issue to install a different revision on a repository. The highest threat from this vulnerability is to data integrity.\r\nhttps://bugzilla.redhat.com/show_bug.cgi?id=1962856',
              Name: 'pyup.io-42559 (CVE-2021-3572)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:N/I:H/A:N',
                    Score: 5.7,
                  },
                },
              },
            },
            {
              Severity: 'Medium',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                "The urllib3 library 1.26.x before 1.26.4 for Python omits SSL certificate validation in some cases involving HTTPS to HTTPS proxies. The initial connection to the HTTPS proxy (if an SSLContext isn't given via proxy_config) doesn't verify the hostname of the certificate. This means certificates for different servers that still validate properly with the default urllib3 SSLContext will be silently accepted.",
              Name: 'pyup.io-40291 (CVE-2021-28363)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N',
                    Score: 6.5,
                  },
                },
              },
            },
            {
              Severity: 'Medium',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                "Pip 21.1 updates its dependency 'urllib3' to v1.26.4 due to security issues.",
              Name: 'pyup.io-40291 (CVE-2021-28363)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N',
                    Score: 6.5,
                  },
                },
              },
            },
            {
              Severity: 'High',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'Pip before 19.2 for Python allows Directory Traversal when a URL is given in an install command, because a Content-Disposition header can have ../ in a filename, as demonstrated by overwriting the /root/.ssh/authorized_keys file. This occurs in _download_http_url in _internal/download.py.',
              Name: 'pyup.io-38765 (CVE-2019-20916)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N',
                    Score: 7.5,
                  },
                },
              },
            },
            {
              Severity: 'Medium',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'A flaw was found in python-pip in the way it handled Unicode separators in git references. A remote attacker could possibly use this issue to install a different revision on a repository. The highest threat from this vulnerability is to data integrity. This is fixed in python-pip version 21.1.',
              Name: 'pyup.io-42559 (CVE-2021-3572)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:N/I:H/A:N',
                    Score: 5.7,
                  },
                },
              },
            },
          ],
        },
        {
          Name: 'dbus-glib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.110-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-six',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.11.0-8.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'tpm2-tss',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.3.2-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libacl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.2.53-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glib2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.56.4-10.el8_4.1',
          Vulnerabilities: [],
        },
        {
          Name: 'cracklib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.9.6-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-rpm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.14.3-14.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'npth',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.5-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-librepo',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.12.0-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'curl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '7.61.1-18.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-inotify',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.9.6-13.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libcomps',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.1.11-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dnf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.4.2-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pciutils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.7.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'mpfr',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.1.6-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dnf-plugin-subscription-manager',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.28.13-6.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'ca-certificates',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2021.2.50-80.0.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'hostname',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '3.20-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glibc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.28-151.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libgcc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '8.4.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libcap-ng',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.7.9-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-iniparse',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.4-31.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libunistring',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.9.9-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'systemd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '239-45.el8_4.9',
          Vulnerabilities: [],
        },
        {
          Name: 'passwd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.80-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'iptables-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.8.4-17.el8_4.1',
          Vulnerabilities: [],
        },
        {
          Name: 'bind-utils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '32:9.11.26-4.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'lz4-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.8.3-3.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'langpacks-en',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.0-12.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'diffutils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '3.6-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gpgme',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.13.1-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'elfutils-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.182-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'subscription-manager',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.28.13-6.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'pcre',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '8.42-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glibc-minimal-langpack',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.28-151.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'platform-python-setuptools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '39.2.0-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'nettle',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.4.1-4.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'systemd-pam',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '239-45.el8_4.9',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-setuptools-wheel',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '39.2.0-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libarchive',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.3.3-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-requests',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.20.0-2.1.el8_1',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-dnf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.4.2-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'requests',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.20.0',
          Vulnerabilities: [],
        },
        {
          Name: 'libdb',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '5.3.28-42.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'libssh',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.9.4-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libusbx',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.0.23-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libibverbs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '32.0-5.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-pysocks',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.6.8-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libxml2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.9.7-9.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'chardet',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.0.4',
          Vulnerabilities: [],
        },
        {
          Name: 'libpsl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.20.2-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'libksba',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.3.5-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'cyrus-sasl-lib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.1.27-6.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'which',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.21-12.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libtirpc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.1.4-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libblkid',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'sed',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.5-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gmp',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:6.1.2-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'platform-python',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.6.8-39.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'yum',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.4.2-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'rootfiles',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '8.1-22.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'decorator',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.2.1',
          Vulnerabilities: [],
        },
        {
          Name: 'gnutls',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.6.14-8.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'setup',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.12.2-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'zlib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.2.11-17.el8',
          Vulnerabilities: [
            {
              Severity: 'High',
              NamespaceName: 'RHEL8-rhel-8.4-eus',
              Link: 'https://access.redhat.com/errata/RHSA-2022:4845 https://access.redhat.com/security/cve/CVE-2018-25032',
              FixedBy: '0:1.2.11-18.el8_4',
              Description:
                'The zlib packages provide a general-purpose lossless data compression library that is used by many different programs.\n\nSecurity Fix(es):\n\n* zlib: A flaw found in zlib when compressing (not decompressing) certain inputs (CVE-2018-25032)\n\nFor more details about the security issue(s), including the impact, a CVSS score, acknowledgments, and other related information, refer to the CVE page(s) listed in the References section.',
              Name: 'RHSA-2022:4845: zlib security update (Important)',
              Metadata: {
                UpdatedBy: 'RHEL8-rhel-8.4-eus',
                RepoName: 'cpe:/a:redhat:rhel_eus:8.4::appstream',
                RepoLink: null,
                DistroName: 'Red Hat Enterprise Linux Server',
                DistroVersion: '8',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                    Score: 7.5,
                  },
                },
              },
            },
            {
              Severity: 'High',
              NamespaceName: 'RHEL8-rhel-8.4-eus',
              Link: 'https://access.redhat.com/errata/RHSA-2022:4845 https://access.redhat.com/security/cve/CVE-2018-25032',
              FixedBy: '0:1.2.11-18.el8_4',
              Description:
                'The zlib packages provide a general-purpose lossless data compression library that is used by many different programs.\n\nSecurity Fix(es):\n\n* zlib: A flaw found in zlib when compressing (not decompressing) certain inputs (CVE-2018-25032)\n\nFor more details about the security issue(s), including the impact, a CVSS score, acknowledgments, and other related information, refer to the CVE page(s) listed in the References section.',
              Name: 'RHSA-2022:4845: zlib security update (Important)',
              Metadata: {
                UpdatedBy: 'RHEL8-rhel-8.4-eus',
                RepoName: 'cpe:/o:redhat:rhel_eus:8.4::baseos',
                RepoLink: null,
                DistroName: 'Red Hat Enterprise Linux Server',
                DistroVersion: '8',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                    Score: 7.5,
                  },
                },
              },
            },
          ],
        },
        {
          Name: 'iproute',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '5.9.0-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'sqlite-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.26.0-13.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libreport-filesystem',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.9.5-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'openssl-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '1:1.1.1g-16.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'protobuf-c',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '1.3.0-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'openldap',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.4.46-17.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus-daemon',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'libzstd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.4.4-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'openssl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '1:1.1.1g-16.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-libcomps',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.1.11-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'json-glib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.4.4-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'p11-kit',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.23.22-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'usermode',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.113-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gdb-gdbserver',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '8.2-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'rpm-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.14.3-14.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-pip-wheel',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '9.0.3-19.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'readline',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '7.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python-dateutil',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.6.1',
          Vulnerabilities: [],
        },
        {
          Name: 'file-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '5.33-16.el8_3.1',
          Vulnerabilities: [],
        },
        {
          Name: 'libxcrypt',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.1.1-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libyaml',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.1.7-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'librepo',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.12.0-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'pciutils-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.7.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pyinotify',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.9.6',
          Vulnerabilities: [],
        },
        {
          Name: 'xkeyboard-config',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '2.28-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libnsl2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.2.0-2.20180605git4a062cf.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'ncurses-base',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '6.1-7.20180224.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gobject-introspection',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.56.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'findutils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:4.6.0-20.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libpwquality',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.4.4-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'procps-ng',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '3.3.15-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pcre2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '10.32-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'info',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '6.5-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'device-mapper',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '8:1.02.175-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'fstrm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '0.6.0-3.el8.1',
          Vulnerabilities: [],
        },
        {
          Name: 'expat',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '2.2.5-4.el8_4.2',
          Vulnerabilities: [
            {
              Severity: 'Medium',
              NamespaceName: 'RHEL8-rhel-8.4-eus',
              Link: 'https://access.redhat.com/errata/RHSA-2022:4834 https://access.redhat.com/security/cve/CVE-2022-23852',
              FixedBy: '0:2.2.5-4.el8_4.3',
              Description:
                'Expat is a C library for parsing XML documents.\n\nSecurity Fix(es):\n\n* expat: Integer overflow in function XML_GetBuffer (CVE-2022-23852)\n\nFor more details about the security issue(s), including the impact, a CVSS score, acknowledgments, and other related information, refer to the CVE page(s) listed in the References section.',
              Name: 'RHSA-2022:4834: expat security update (Moderate)',
              Metadata: {
                UpdatedBy: 'RHEL8-rhel-8.4-eus',
                RepoName: 'cpe:/a:redhat:rhel_eus:8.4::appstream',
                RepoLink: null,
                DistroName: 'Red Hat Enterprise Linux Server',
                DistroVersion: '8',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                    Score: 9.8,
                  },
                },
              },
            },
            {
              Severity: 'Medium',
              NamespaceName: 'RHEL8-rhel-8.4-eus',
              Link: 'https://access.redhat.com/errata/RHSA-2022:4834 https://access.redhat.com/security/cve/CVE-2022-23852',
              FixedBy: '0:2.2.5-4.el8_4.3',
              Description:
                'Expat is a C library for parsing XML documents.\n\nSecurity Fix(es):\n\n* expat: Integer overflow in function XML_GetBuffer (CVE-2022-23852)\n\nFor more details about the security issue(s), including the impact, a CVSS score, acknowledgments, and other related information, refer to the CVE page(s) listed in the References section.',
              Name: 'RHSA-2022:4834: expat security update (Moderate)',
              Metadata: {
                UpdatedBy: 'RHEL8-rhel-8.4-eus',
                RepoName: 'cpe:/o:redhat:rhel_eus:8.4::baseos',
                RepoLink: null,
                DistroName: 'Red Hat Enterprise Linux Server',
                DistroVersion: '8',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                    Score: 9.8,
                  },
                },
              },
            },
          ],
        },
        {
          Name: 'python3-decorator',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.2.1-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gnupg2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.2.20-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-dateutil',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:2.6.1-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'rsync',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '3.1.3-12.el8',
          Vulnerabilities: [
            {
              Severity: 'High',
              NamespaceName: 'RHEL8-rhel-8.4-eus',
              Link: 'https://access.redhat.com/errata/RHSA-2022:2198 https://access.redhat.com/security/cve/CVE-2018-25032',
              FixedBy: '0:3.1.3-12.el8_4.1',
              Description:
                'The rsync utility enables the users to copy and synchronize files locally or across a network. Synchronization with rsync is fast because rsync only sends the differences in files over the network instead of sending whole files. The rsync utility is also used as a mirroring tool.\n\nSecurity Fix(es):\n\n* zlib: A flaw found in zlib when compressing (not decompressing) certain inputs (CVE-2018-25032)\n\nFor more details about the security issue(s), including the impact, a CVSS score, acknowledgments, and other related information, refer to the CVE page(s) listed in the References section.',
              Name: 'RHSA-2022:2198: rsync security update (Important)',
              Metadata: {
                UpdatedBy: 'RHEL8-rhel-8.4-eus',
                RepoName: 'cpe:/a:redhat:rhel_eus:8.4::appstream',
                RepoLink: null,
                DistroName: 'Red Hat Enterprise Linux Server',
                DistroVersion: '8',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                    Score: 7.5,
                  },
                },
              },
            },
            {
              Severity: 'High',
              NamespaceName: 'RHEL8-rhel-8.4-eus',
              Link: 'https://access.redhat.com/errata/RHSA-2022:2198 https://access.redhat.com/security/cve/CVE-2018-25032',
              FixedBy: '0:3.1.3-12.el8_4.1',
              Description:
                'The rsync utility enables the users to copy and synchronize files locally or across a network. Synchronization with rsync is fast because rsync only sends the differences in files over the network instead of sending whole files. The rsync utility is also used as a mirroring tool.\n\nSecurity Fix(es):\n\n* zlib: A flaw found in zlib when compressing (not decompressing) certain inputs (CVE-2018-25032)\n\nFor more details about the security issue(s), including the impact, a CVSS score, acknowledgments, and other related information, refer to the CVE page(s) listed in the References section.',
              Name: 'RHSA-2022:2198: rsync security update (Important)',
              Metadata: {
                UpdatedBy: 'RHEL8-rhel-8.4-eus',
                RepoName: 'cpe:/o:redhat:rhel_eus:8.4::baseos',
                RepoLink: null,
                DistroName: 'Red Hat Enterprise Linux Server',
                DistroVersion: '8',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                    Score: 7.5,
                  },
                },
              },
            },
          ],
        },
        {
          Name: 'subscription-manager-rhsm-certificates',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.28.13-6.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'hwdata',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.314-8.8.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libsemanage',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.9-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-dnf-plugins-core',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.0.18-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'util-linux',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'ima-evm-utils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.3.2-12.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pam',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.3.1-14.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'cryptsetup-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.3.3-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'ply',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '3.9',
          Vulnerabilities: [],
        },
        {
          Name: 'syspurpose',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.28.13',
          Vulnerabilities: [],
        },
        {
          Name: 'rpm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.14.3-14.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'libverto',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.3.0-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python36',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '3.6.8-2.module+el8.1.0+3334+5cb623d7',
          Vulnerabilities: [],
        },
        {
          Name: 'libmount',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'cracklib-dicts',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.9.6-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-dbus',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.2.4-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'urllib3',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.24.2',
          Vulnerabilities: [
            {
              Severity: 'High',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'urllib3 before 1.25.9 allows CRLF injection if the attacker controls the HTTP request method, as demonstrated by inserting CR and LF control characters in the first argument of putrequest(). See: CVE-2020-26137. NOTE: this is similar to CVE-2020-26116.',
              Name: 'pyup.io-38834 (CVE-2020-26137)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:L/A:N',
                    Score: 7.2,
                  },
                },
              },
            },
            {
              Severity: 'High',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'urllib3 before 1.25.9 allows CRLF injection if the attacker controls the HTTP request method, as demonstrated by inserting CR and LF control characters in the first argument of putrequest(). NOTE: this is similar to CVE-2020-26116.',
              Name: 'pyup.io-38834 (CVE-2020-26137)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:L/A:N',
                    Score: 7.2,
                  },
                },
              },
            },
            {
              Severity: 'High',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'Urllib3 1.25.9 includes a fix for CVE-2020-26137: Urllib3 before 1.25.9 allows CRLF injection if the attacker controls the HTTP request method, as demonstrated by inserting CR and LF control characters in the first argument of putrequest(). NOTE: this is similar to CVE-2020-26116.\r\nhttps://bugs.python.org/issue39603\r\nhttps://github.com/urllib3/urllib3/commit/1dd69c5c5982fae7c87a620d487c2ebf7a6b436b\r\nhttps://github.com/urllib3/urllib3/pull/1800',
              Name: 'pyup.io-38834 (CVE-2020-26137)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:L/A:N',
                    Score: 7.2,
                  },
                },
              },
            },
            {
              Severity: 'High',
              NamespaceName: 'pyupio',
              Link: '',
              FixedBy: '',
              Description:
                'Urllib3 1.26.5 includes a fix for CVE-2021-33503: An issue was discovered in urllib3 before 1.26.5. When provided with a URL containing many @ characters in the authority component, the authority regular expression exhibits catastrophic backtracking, causing a denial of service if a URL were passed as a parameter or redirected to via an HTTP redirect.\r\nhttps://github.com/advisories/GHSA-q2q7-5pp4-w6pg',
              Name: 'pyup.io-43975 (CVE-2021-33503)',
              Metadata: {
                UpdatedBy: 'pyupio',
                RepoName: 'pypi',
                RepoLink: 'https://pypi.org/simple',
                DistroName: '',
                DistroVersion: '',
                NVD: {
                  CVSSv3: {
                    Vectors: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                    Score: 7.5,
                  },
                },
              },
            },
          ],
        },
        {
          Name: 'libuuid',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'shadow-utils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2:4.6-12.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-gobject-base',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.28.3-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-urllib3',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.24.2-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'crypto-policies-scripts',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '20210209-1.gitbfb6bed.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-bind',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '32:9.11.26-4.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'ethtool',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.14',
          Vulnerabilities: [],
        },
        {
          Name: 'libcom_err',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '1.45.6-2.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'ncurses-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '6.1-7.20180224.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'redhat-release',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '8.4-0.6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libsepol',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.9-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libseccomp',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.5.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-setuptools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '39.2.0-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus-python',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.2.4',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-chardet',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.0.4-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libgpg-error',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.31-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-libdnf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.55.0-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libcap',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.26-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'bind-license',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '32:9.11.26-4.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'openssl-pkcs11',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '0.4.10-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'elfutils-libelf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.182-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'platform-python-pip',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '9.0.3-19.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libmodulemd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.9.4-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'crypto-policies',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '20210209-1.gitbfb6bed.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'wget',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '1.19.5-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-ply',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '3.9-9.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libmnl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '1.0.4-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'chkconfig',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '1.13-2.el8_4.1',
          Vulnerabilities: [],
        },
        {
          Name: 'gpg-pubkey',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: 'fd431d51-4ae0493b',
          Vulnerabilities: [],
        },
        {
          Name: 'libsolv',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.7.16-3.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'basesystem',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '11-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'rpm-build-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.14.3-14.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'brotli',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.0.6-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'vim-minimal',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2:8.0.1763-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libssh-config',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.9.4-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libmaxminddb',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '1.2.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'keyutils-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.5.10-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libselinux',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.9-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glibc-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.28-151.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libxkbcommon',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '0.9.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dnf-data',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.4.2-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'krb5-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.18.2-8.3.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'libtasn1',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.13-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'bash',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '4.4.20-1.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'idna',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.5',
          Vulnerabilities: [],
        },
        {
          Name: 'six',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.11.0',
          Vulnerabilities: [],
        },
        {
          Name: 'gdbm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:1.18-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'librhsm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.0.3-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'kmod-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '25-17.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libcurl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '7.61.1-18.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'libstdc++',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '8.4.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libuser',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.62-23.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'bind-libs-lite',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '32:9.11.26-4.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'xz-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '5.2.4-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-syspurpose',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.28.13-6.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'publicsuffix-list-dafsa',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '20180723-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dmidecode',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:3.2-8.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libattr',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.4.48-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'setuptools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '39.2.0',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-pip',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '9.0.3-19.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'audit-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.0-0.17.20191104git1c2f876.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libsigsegv',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.11-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gzip',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.9-12.el8',
          Vulnerabilities: [
            {
              Severity: 'High',
              NamespaceName: 'RHEL8-rhel-8.4-eus',
              Link: 'https://access.redhat.com/errata/RHSA-2022:1676 https://access.redhat.com/security/cve/CVE-2022-1271',
              FixedBy: '0:1.9-13.el8_4',
              Description:
                'The gzip packages contain the gzip (GNU zip) data compression utility. gzip is used to compress regular files. It replaces them with files containing the .gz extension, while retaining ownership modes, access, and modification times.\n\nSecurity Fix(es):\n\n* gzip: arbitrary-file-write vulnerability (CVE-2022-1271)\n\nFor more details about the security issue(s), including the impact, a CVSS score, acknowledgments, and other related information, refer to the CVE page(s) listed in the References section.',
              Name: 'RHSA-2022:1676: gzip security update (Important)',
              Metadata: {
                UpdatedBy: 'RHEL8-rhel-8.4-eus',
                RepoName: 'cpe:/a:redhat:rhel_eus:8.4::appstream',
                RepoLink: null,
                DistroName: 'Red Hat Enterprise Linux Server',
                DistroVersion: '8',
                NVD: {CVSSv3: {Vectors: '', Score: ''}},
              },
            },
            {
              Severity: 'High',
              NamespaceName: 'RHEL8-rhel-8.4-eus',
              Link: 'https://access.redhat.com/errata/RHSA-2022:1676 https://access.redhat.com/security/cve/CVE-2022-1271',
              FixedBy: '0:1.9-13.el8_4',
              Description:
                'The gzip packages contain the gzip (GNU zip) data compression utility. gzip is used to compress regular files. It replaces them with files containing the .gz extension, while retaining ownership modes, access, and modification times.\n\nSecurity Fix(es):\n\n* gzip: arbitrary-file-write vulnerability (CVE-2022-1271)\n\nFor more details about the security issue(s), including the impact, a CVSS score, acknowledgments, and other related information, refer to the CVE page(s) listed in the References section.',
              Name: 'RHSA-2022:1676: gzip security update (Important)',
              Metadata: {
                UpdatedBy: 'RHEL8-rhel-8.4-eus',
                RepoName: 'cpe:/o:redhat:rhel_eus:8.4::baseos',
                RepoLink: null,
                DistroName: 'Red Hat Enterprise Linux Server',
                DistroVersion: '8',
                NVD: {CVSSv3: {Vectors: '', Score: ''}},
              },
            },
          ],
        },
        {
          Name: 'gpg-pubkey',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: 'd4082792-5b32db75',
          Vulnerabilities: [],
        },
        {
          Name: 'libassuan',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.5.1-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gdbm-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1:1.18-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'lua-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '5.3.4-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'lsof',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '4.93.2-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libffi',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.1-22.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'subscription-manager',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.28.13',
          Vulnerabilities: [],
        },
        {
          Name: 'libidn2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.2.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'filesystem',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.8-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'elfutils-default-yama-scope',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.182-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libutempter',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.1.6-14.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'coreutils-single',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '8.30-8.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'tar',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2:1.30-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'systemd-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '239-45.el8_4.9',
          Vulnerabilities: [],
        },
        {
          Name: 'iniparse',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.4',
          Vulnerabilities: [],
        },
        {
          Name: 'bzip2-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.0.6-26.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'json-c',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.13.1-0.4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.6.8-39.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'libgcrypt',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.8.5-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'grep',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.1-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libnghttp2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.33.0-3.el8_2.1',
          Vulnerabilities: [],
        },
        {
          Name: 'tzdata',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:9a8fb512735a1ed60cd080c4e4907c295a1f2027a07c16f01da093fdc1c22c85',
          Version: '2022a-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libnl3',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '3.5.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-subscription-manager-rhsm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.28.13-6.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'bind-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '32:9.11.26-4.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-hawkey',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '0.55.0-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libmetalink',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:f606edb6a32a7c5bce00ab71be5f987ba16eb6bc68bd6c5cefe48bc8199552ca',
          Version: '0.1.3-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'device-mapper-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '8:1.02.175-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libdb-utils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '5.3.28-42.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'rdma-core',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '32.0-5.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-idna',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.5-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'virt-what',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.18-9.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'popt',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '1.18-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libfdisk',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:57fce60a81bf84e6b61ce2b64643c9e4c61da77869b95e0641360b42429c0cff',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
      ],
    },
  },
} as SecurityDetailsResponse;

const NVD_VECTORS = {
  AV: {
    title: 'Attack Vector',
    description:
      'This metric reflects how the vulnerability is exploited. The more remote an attacker can be to attack a host, the greater the vulnerability score.',
    values: [
      {
        id: 'N',
        title: 'Network',
        description:
          'A vulnerability exploitable with network access means the vulnerable software is bound to the network stack and the attacker does not require local network access or local access.  Such a vulnerability is often termed "remotely exploitable". For example, an attacker causing a denial of service (DoS) by sending a specially crafted TCP packet across a wide area network.',
        severity: 'high',
      },
      {
        id: 'A',
        title: 'Adjacent Network',
        description:
          'A vulnerability exploitable with adjacent network access means the vulnerable software is bound to the network stack. The attack is limited at the protocol level to a logically adjacent topology. An attack can be launched from the same shared physical (e.g., Bluetooth or IEEE 802.11) or logical (e.g., local IP subnet) network, or from within a secure or otherwise limited administrative domain.',
        severity: 'medium',
      },
      {
        id: 'L',
        title: 'Local',
        description:
          'A vulnerability exploitable with only local access requires the attacker to have local access to the target system (e.g., keyboard, console), or remotely (e.g., SSH); or rely on User Interaction by another person to perform actions to exploit the vulnerability (e.g., using social engineering techniques to trick a legitimate user into opening a malicious document).',
        severity: 'low',
      },
      {
        id: 'P',
        title: 'Physical',
        description:
          'A vulnerability exploitable with Physical access requires the attacker to have physical access to the vulnerable system or a local (shell) account. Examples of locally exploitable vulnerabilities are peripheral attacks such as Firewire/USB DMA attacks.',
        severity: 'low',
      },
    ],
  },

  AC: {
    title: 'Attack Complexity',
    description:
      'This metric describes the conditions beyond the attacker’s control that must exist in order to exploit the vulnerability. The Base Score is greatest for the least complex attacks.',
    values: [
      {
        id: 'L',
        title: 'Low',
        description:
          'Specialized access conditions or extenuating circumstances do not exist making this easy to exploit',
        severity: 'high',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'Specialized access conditions exist making this harder to exploit',
        severity: 'low',
      },
    ],
  },

  PR: {
    title: 'Privileges Required',
    description:
      'This metric describes the level of privileges an attacker must possess before exploiting the vulnerability. If no privileges are required, the base score is greatest.',
    values: [
      {
        id: 'N',
        title: 'None',
        description: 'The attacker is unauthorized prior to attack.',
        severity: 'high',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'An attacker with Low privileges has the ability to access only non-sensitive resources.',
        severity: 'medium',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'The attacker requires privileges that provide significant control(e.g., component-wide settings and files) over the vulnerable component.',
        severity: 'low',
      },
    ],
  },

  UI: {
    title: 'User Interaction',
    description:
      'This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component. If no user interaction is required, the base score is greatest.',
    values: [
      {
        id: 'N',
        title: 'None',
        description:
          'The system can be exploited without interaction from any user.',
        severity: 'high',
      },
      {
        id: 'R',
        title: 'Required',
        description:
          'The system can be exploited with user interaction(e.g., installation of an application).',
        severity: 'medium',
      },
    ],
  },

  S: {
    title: 'Scope',
    description:
      'This metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope. The Base Score is greatest when a scope change occurs.',
    values: [
      {
        id: 'U',
        title: 'Unchanged',
        description:
          'An exploited vulnerability can only affect resources managed by the same security authority. The vulnerable component and the impacted component are either the same, or both are managed by the same security authority.',
        severity: 'low',
      },
      {
        id: 'C',
        title: 'Changed',
        description:
          'An exploited vulnerability can affect resources beyond the security scope managed by the security authority of the vulnerable component. The vulnerable component and the impacted component are different and managed by different security authorities.',
        severity: 'high',
      },
    ],
  },

  C: {
    title: 'Confidentiality Impact',
    description:
      'This metric measures the impact on confidentiality of a successfully exploited vulnerability. Confidentiality refers to limiting information access and disclosure to only authorized users, as well as preventing access by, or disclosure to, unauthorized ones. Increased confidentiality impact increases the vulnerability score.',
    values: [
      {
        id: 'H',
        title: 'High',
        description:
          "There is a total loss of confidentiality, resulting in disclosing all resources within the impacted component to the attacker. For example, an attacker steals the administrator's password, or private encryption keys of a web server.",
        severity: 'high',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is limited. The information disclosure does not cause a direct, serious loss to the impacted component.',
        severity: 'medium',
      },
      {
        id: 'N',
        title: 'None',
        description: 'There is no impact to the confidentiality of the system.',
        severity: 'low',
      },
    ],
  },

  I: {
    title: 'Integrity Impact',
    description:
      'This metric measures the impact to integrity of a successfully exploited vulnerability. Integrity refers to the trustworthiness and guaranteed veracity of information. The vulnerability Score is greatest when the consequence to the impacted component is highest.',
    values: [
      {
        id: 'H',
        title: 'High',
        description:
          'There is a total compromise of system integrity. There is a complete loss of system protection, resulting in the entire system being compromised. For example, the attacker is able to modify any/all files on the target system',
        severity: 'high',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'Modification of some system files or information is possible, but the attacker does not have control over what can be modified, or the scope of what the attacker can affect is limited. For example, system or application files may be overwritten or modified, but either the attacker has no control over which files are affected or the attacker can modify files within only a limited context or scope.',
        severity: 'medium',
      },
      {
        id: 'N',
        title: 'None',
        description: 'There is no impact to the integrity of the system.',
        severity: 'low',
      },
    ],
  },

  A: {
    title: 'Availability Impact',
    description:
      'This metric measures the impact to availability of a successfully exploited vulnerability. Availability refers to the accessibility of information resources. Attacks that consume network bandwidth, processor cycles, or disk space all impact the availability of a system. Increased availability impact increases the vulnerability score.',
    values: [
      {
        id: 'H',
        title: 'High',
        description:
          'There is a total shutdown of the affected resource. The attacker can render the resource completely unavailable.',
        severity: 'high',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'There is reduced performance or interruptions in resource availability. An example is a network-based flood attack that permits a limited number of successful connections to an Internet service.',
        severity: 'medium',
      },
      {
        id: 'N',
        title: 'None',
        description: 'There is no impact to the availability of the system.',
        severity: 'low',
      },
    ],
  },

  E: {
    title: 'Exploit Code Maturity',
    description:
      'This metric measures the likelihood of the vulnerability being attacked, and is based on the current state of exploit techniques, code availability or active exploitation.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Temporal Score.',
        severity: 'high',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'No exploit is required and details are widely available. Exploit code works in every situation, or is actively being delivered via an autonomous agent (such as a worm or virus).',
        severity: 'high',
      },
      {
        id: 'F',
        title: 'Functional',
        description:
          'Functional exploit code is available. The code works in most situations where the vulnerability exists.',
        severity: 'medium',
      },
      {
        id: 'P',
        title: 'Proof-of-Concept',
        description:
          'An attack demonstration is not practical for most systems. The code or technique is not functional in all situations and may require substantial modification by a skilled attacker.',
        severity: 'medium',
      },
      {
        id: 'U',
        title: 'Unproven',
        description:
          'No exploit code is available, or an exploit is theoretical.',
        severity: 'low',
      },
    ],
  },

  RL: {
    title: 'Remediation Level',
    description:
      'A typical vulnerability is unpatched when initially published. Workarounds or hotfixes may offer interim remediation until an official patch or upgrade is issued. The less official and permanent a fix, the higher the vulnerability score.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Temporal Score.',
        severity: 'high',
      },
      {
        id: 'U',
        title: 'Unavailable',
        description:
          'There is either no solution available or it is impossible to apply.',
        severity: 'high',
      },
      {
        id: 'W',
        title: 'Workaround',
        description:
          'There is an unofficial, non-vendor solution available. Users of the affected technology may create a patch of their own or provide steps to work around or mitigate the vulnerability.',
        severity: 'medium',
      },
      {
        id: 'T',
        title: 'Temporary Fix',
        description:
          'There is an official but temporary fix available. This includes instances where the vendor issues a temporary hotfix, tool, or workaround.',
        severity: 'medium',
      },
      {
        id: 'O',
        title: 'Official Fix',
        description:
          'A complete vendor solution is available. Either the vendor has issued an official patch, or an upgrade is available.',
        severity: 'low',
      },
    ],
  },

  RC: {
    title: 'Report Confidence',
    description:
      'This metric measures the degree of confidence in the existence of the vulnerability and the credibility of known technical details. The urgency of a vulnerability is higher when a vulnerability is known to exist with certainty. ',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Temporal Score.',
        severity: 'high',
      },
      {
        id: 'C',
        title: 'Confirmed',
        description:
          'Detailed reports exist, or functional reproduction is possible (functional exploits may provide this).',
        severity: 'high',
      },
      {
        id: 'R',
        title: 'Reasonable',
        description:
          'Significant details are published, but researchers do not have full confidence in the root cause. The bug is reproducible and at least one impact is able to be verified (proof-of-concept exploits may provide this).',
        severity: 'medium',
      },
      {
        id: 'U',
        title: 'Unknown',
        description:
          'Reporters are uncertain of the true nature of the vulnerability, and there is little confidence in the validity of the reports.',
        severity: 'low',
      },
    ],
  },

  CR: {
    title: 'Confidentiality Requirement',
    description:
      'This metrics enables customization of CVSS score depending on the importance of the affected IT asset to a user’s organization, measured in terms of Confidentiality.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'Loss of Confidentiality can have a catastrophic adverse effect on the organization or individuals associated (e.g., employees, customers).',
        severity: 'high',
      },
      {
        id: 'M',
        title: 'Medium',
        description:
          'Loss of Confidentiality can have a serious adverse effect on the organization or individuals associated (e.g., employees, customers).',
        severity: 'medium',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'Loss of Confidentiality can have only a limited adverse effect on the organization or individuals associated (e.g., employees, customers).',
        severity: 'low',
      },
    ],
  },

  IR: {
    title: 'Integrity Requirement',
    description:
      'This metrics enables customization of CVSS score depending on the importance of the affected IT asset to a user’s organization, measured in terms of Integrity.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'Loss of Integrity can have a catastrophic adverse effect on the organization or individuals associated (e.g., employees, customers).',
        severity: 'high',
      },
      {
        id: 'M',
        title: 'Medium',
        description:
          'Loss of Integrity can have a serious adverse effect on the organization or individuals associated (e.g., employees, customers).',
        severity: 'medium',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'Loss of Integrity can have only a limited adverse effect on the organization or individuals associated (e.g., employees, customers).',
        severity: 'low',
      },
    ],
  },

  AR: {
    title: 'Availability Requirement',
    description:
      'This metrics enables customization of CVSS score depending on the importance of the affected IT asset to a user’s organization, measured in terms of Availability.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'Loss of Availability can have a catastrophic adverse effect on the organization or individuals associated (e.g., employees, customers).',
        severity: 'high',
      },
      {
        id: 'M',
        title: 'Medium',
        description:
          'Loss of Availability can have a serious adverse effect on the organization or individuals associated (e.g., employees, customers).',
        severity: 'medium',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'Loss of Availability can have only a limited adverse effect on the organization or individuals associated (e.g., employees, customers).',
        severity: 'low',
      },
    ],
  },

  MAV: {
    title: 'Modified Attack Vector',
    description:
      'This metrics enables the override of base metrics based on specific characteristics of a user’s environment.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'N',
        title: 'Network',
        description:
          'A vulnerability exploitable with network access means the vulnerable software is bound to the network stack and the attacker does not require local network access or local access.  Such a vulnerability is often termed "remotely exploitable".  An example of a network attack is an RPC buffer overflow.',
        severity: 'high',
      },
      {
        id: 'A',
        title: 'Adjacent Network',
        description:
          'A vulnerability exploitable with adjacent network access requires the attacker to have access to either the broadcast or collision domain of the vulnerable software.  Examples of local networks include local IP subnet, Bluetooth, IEEE 802.11, and local Ethernet segment.',
        severity: 'medium',
      },
      {
        id: 'L',
        title: 'Local',
        description:
          'A vulnerability exploitable with only local access requires the attacker to have local access to the target system (e.g., keyboard, console), or remotely (e.g., SSH); or rely on User Interaction by another person to perform actions to exploit the vulnerability (e.g., using social engineering techniques to trick a legitimate user into opening a malicious document).',
        severity: 'low',
      },
      {
        id: 'P',
        title: 'Physical',
        description:
          'A vulnerability exploitable with Physical access requires the attacker to have physical access to the vulnerable system or a local (shell) account. Examples of locally exploitable vulnerabilities are peripheral attacks such as Firewire/USB DMA attacks.',
        severity: '??',
      },
    ],
  },

  MAC: {
    title: 'Modified Attack Complexity',
    description:
      'This metrics enables the override of base metrics based on specific characteristics of a user’s environment.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'Specialized access conditions or extenuating circumstances do not exist making this easy to exploit',
        severity: 'high',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'Specialized access conditions exist making this harder to exploit',
        severity: 'low',
      },
    ],
  },

  MPR: {
    title: 'Modified Privileges Required',
    description:
      'This metrics enables the override of base metrics based on specific characteristics of a user’s environment.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'N',
        title: 'None',
        description: 'The attacker is unauthorized prior to attack.',
        severity: 'high',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'An attacker with Low privileges has the ability to access only non-sensitive resources.',
        severity: 'medium',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'The attacker requires privileges that provide significant control(e.g., component-wide settings and files) over the vulnerable component.',
        severity: 'low',
      },
    ],
  },

  MUI: {
    title: 'Modified User Interaction',
    description:
      'This metrics enables the override of base metrics based on specific characteristics of a user’s environment.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'N',
        title: 'None',
        description:
          'The system can be exploited without interaction from any user.',
        severity: 'high',
      },
      {
        id: 'R',
        title: 'Required',
        description:
          'The system can be exploited with user interaction(e.g., installation of an application).',
        severity: 'medium',
      },
    ],
  },

  MS: {
    title: 'Modified Scope',
    description:
      'This metrics enables the override of base metrics based on specific characteristics of a user’s environment.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'U',
        title: 'Unchanged',
        description:
          'An exploited vulnerability can only affect resources managed by the same security authority. The vulnerable component and the impacted component are either the same, or both are managed by the same security authority.',
        severity: 'low',
      },
      {
        id: 'C',
        title: 'Changed',
        description:
          'An exploited vulnerability can affect resources beyond the security scope managed by the security authority of the vulnerable component. The vulnerable component and the impacted component are different and managed by different security authorities.',
        severity: 'high',
      },
    ],
  },

  MC: {
    title: 'Modified Confidentiality Impact',
    description:
      'This metrics enables the override of base metrics based on specific characteristics of a user’s environment.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'H',
        title: 'High',
        description:
          "There is total information disclosure, resulting in all system files being revealed. The attacker is able to read all of the system's data (memory, files, etc.)",
        severity: 'high',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'There is considerable informational disclosure. Access to some system files is possible, but the attacker does not have control over what is obtained, or the scope of the loss is constrained. An example is a vulnerability that divulges only certain tables in a database.',
        severity: 'medium',
      },
      {
        id: 'N',
        title: 'None',
        description: 'There is no impact to the confidentiality of the system.',
        severity: 'low',
      },
    ],
  },

  MI: {
    title: 'Modified Integrity Impact',
    description:
      'This metrics enables the override of base metrics based on specific characteristics of a user’s environment.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'There is a total compromise of system integrity. There is a complete loss of system protection, resulting in the entire system being compromised. The attacker is able to modify any files on the target system',
        severity: 'high',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'Modification of some system files or information is possible, but the attacker does not have control over what can be modified, or the scope of what the attacker can affect is limited. For example, system or application files may be overwritten or modified, but either the attacker has no control over which files are affected or the attacker can modify files within only a limited context or scope.',
        severity: 'medium',
      },
      {
        id: 'N',
        title: 'None',
        description: 'There is no impact to the integrity of the system.',
        severity: 'low',
      },
    ],
  },

  MA: {
    title: 'Modified Availability Impact',
    description:
      'This metrics enables the override of base metrics based on specific characteristics of a user’s environment.',
    values: [
      {
        id: 'X',
        title: 'Not Defined',
        description:
          'Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score.',
        severity: 'high',
      },
      {
        id: 'H',
        title: 'High',
        description:
          'There is a total shutdown of the affected resource. The attacker can render the resource completely unavailable.',
        severity: 'high',
      },
      {
        id: 'L',
        title: 'Low',
        description:
          'There is reduced performance or interruptions in resource availability. An example is a network-based flood attack that permits a limited number of successful connections to an Internet service.',
        severity: 'medium',
      },
      {
        id: 'N',
        title: 'None',
        description: 'There is no impact to the availability of the system.',
        severity: 'low',
      },
    ],
  },
};
