import {mock} from '../../MockAxios';

const securityUrl =
  /api\/v1\/repository\/.+\/.+\/manifest\/.+\/security\?vulnerabilities=true/;

const mockSecurityResponse = {
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
};

const mockResponseNoVulns = {
  status: 'scanned',
  data: {
    Layer: {
      Name: 'sha256:ee4e8b351f1976248ad72cc4420b9e747c4fc9ca4a9443783dba824f50954a91',
      ParentName: '',
      NamespaceName: '',
      IndexedByVersion: 4,
      Features: [
        {
          Name: 'trousers-lib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.3.15-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'centos-gpg-keys',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:8-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'less',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '530-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libselinux',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.9-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libX11-xcb',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.6.8-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'kbd-misc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.0.4-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'ncurses-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '6.1-7.20180224.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-dnf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '4.4.2-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'chkconfig',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.13-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'lz4-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.8.3-3.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'ima-evm-utils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.3.2-12.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'qemu-kvm-block-rbd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '15:4.2.0-48.module_el8.4.0+885+5e18b468.3',
          Vulnerabilities: [],
        },
        {
          Name: 'libnl3',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.5.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'iso-codes',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.79-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libffi',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.1-22.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'boost-date-time',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.66.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libwayland-cursor',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.17.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'platform-python',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.6.8-37.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libgcrypt',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.8.5-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'elfutils-default-yama-scope',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.182-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'mesa-libEGL',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '20.3.3-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'usbredir',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.8.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libmetalink',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.1.3-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pam',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.3.1-14.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pciutils-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.7.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'curl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '7.61.1-18.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libcurl-minimal',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '7.61.1-18.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libcap-ng',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.7.9-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'qemu-kvm-block-iscsi',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '15:4.2.0-48.module_el8.4.0+885+5e18b468.3',
          Vulnerabilities: [],
        },
        {
          Name: 'libkcapi',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.2.0-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gzip',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.9-12.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'acl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.2.53-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'nss-softokn',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.53.1-17.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'p11-kit',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.23.22-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'iputils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '20180629-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'boost-atomic',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.66.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'openssl-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1:1.1.1g-15.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'orc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.4.28-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libxcrypt',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '4.1.1-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glusterfs-api',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '6.0-49.1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'json-c',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.13.1-0.4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libsolv',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.7.16-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pcre2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '10.32-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'mpfr',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.1.6-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libsepol',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.9-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'cairo',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.15.12-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'util-linux',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libdb',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '5.3.28-40.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'boost-program-options',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.66.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libunistring',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.9.9-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dhcp-client',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '12:4.3.6-44.0.1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libwayland-server',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.17.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'centos-linux-release',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '8.4-1.2105.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'grub2-tools-minimal',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:2.02-99.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'kbd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.0.4-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libassuan',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.5.1-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libxkbcommon',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.9.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'bzip2-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.0.6-26.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'file',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '5.33-16.el8_3.1',
          Vulnerabilities: [],
        },
        {
          Name: 'hostname',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.20-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'celt051',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.5.1.3-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'info',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '6.5-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'cpio',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.12-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'os-prober',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.74-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'popt',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.18-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'ca-certificates',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2020.2.41-80.0.el8_2',
          Vulnerabilities: [],
        },
        {
          Name: 'libXrender',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.9.10-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-gpg',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.13.1-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'kbd-legacy',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.0.4-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libssh',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.9.4-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libogg',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2:1.3.2-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libpcap',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '14:1.9.1-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libXft',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.3.3-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gdbm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1:1.18-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'librados2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:12.2.7-9.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'rpm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '4.14.3-14.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'libmnl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.0.4-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'boost-chrono',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.66.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'p11-kit-trust',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.23.22-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'sed',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '4.5-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'crypto-policies',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '20210209-1.gitbfb6bed.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'cryptsetup-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.3.3-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'boost-iostreams',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.66.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'langpacks-en',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.0-12.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libdrm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.4.103-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-rpm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '4.14.3-14.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'shadow-utils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2:4.6-12.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pixman',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.38.4-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'mesa-filesystem',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '20.3.3-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libXau',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.0.9-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'xml-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.6.3-50.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libglvnd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.3.2-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dracut',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '049-135.git20210121.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glib2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.56.4-10.el8_4.1',
          Vulnerabilities: [],
        },
        {
          Name: 'gpgme',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.13.1-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'tpm2-tss',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.3.2-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libkcapi-hmaccalc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.2.0-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'mesa-libglapi',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '20.3.3-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'elfutils-libelf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.182-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'opus',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.3-0.4.beta.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'mesa-dri-drivers',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '20.3.3-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'harfbuzz',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.7.5-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'elfutils-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.182-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'file-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '5.33-16.el8_3.1',
          Vulnerabilities: [],
        },
        {
          Name: 'qemu-kvm-block-ssh',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '15:4.2.0-48.module_el8.4.0+885+5e18b468.3',
          Vulnerabilities: [],
        },
        {
          Name: 'libwayland-client',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.17.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'boost-regex',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.66.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glusterfs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '6.0-49.1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libsmartcols',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'seabios-bin',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.13.0-2.module_el8.4.0+547+a85d02ba',
          Vulnerabilities: [],
        },
        {
          Name: 'libgomp',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '8.4.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'lua-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '5.3.4-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'filesystem',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.8-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libiscsi',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.18.0-8.module_el8.4.0+547+a85d02ba',
          Vulnerabilities: [],
        },
        {
          Name: 'libdb-utils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '5.3.28-40.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libepoxy',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.5.3-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'device-mapper-multipath-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.8.4-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dhcp-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '12:4.3.6-44.0.1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libtirpc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.1.4-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'graphite2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.3.10-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'qemu-kvm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '15:4.2.0-48.module_el8.4.0+885+5e18b468.3',
          Vulnerabilities: [],
        },
        {
          Name: 'openssh',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '8.0p1-6.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'openldap',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.4.46-17.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'fontpackages-filesystem',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.44-22.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-libdnf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.55.0-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'systemd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '239-45.el8_4.3',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-hawkey',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.55.0-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'which',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.21-12.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libicu',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '60.3-2.el8_1',
          Vulnerabilities: [],
        },
        {
          Name: 'rdma-core',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '32.0-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gdbm-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1:1.18-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libxcb',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.13.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libverto',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.3.0-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libarchive',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.3.3-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libseccomp',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.5.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'tar',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2:1.30-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'nettle',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.4.1-4.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'libnsl2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.2.0-2.20180605git4a062cf.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'boost-system',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.66.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pango',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.42.4-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gnutls',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.6.14-8.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus-tools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'cracklib-dicts',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.9.6-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'qemu-img',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '15:4.2.0-48.module_el8.4.0+885+5e18b468.3',
          Vulnerabilities: [],
        },
        {
          Name: 'libsigsegv',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.11-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libXdamage',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.1.4-14.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'basesystem',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '11-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'npth',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.5-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'llvm-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '11.0.0-2.module_el8.4.0+587+5187cac0',
          Vulnerabilities: [],
        },
        {
          Name: 'libpwquality',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.4.4-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'libblkid',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libXext',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.3.4-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libnghttp2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.33.0-3.el8_2.1',
          Vulnerabilities: [],
        },
        {
          Name: 'mesa-libgbm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '20.3.3-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libmodulemd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.9.4-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glusterfs-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '6.0-49.1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libsemanage',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.9-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libpng',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2:1.6.34-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'binutils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.30-93.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libdnf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.55.0-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-setuptools-wheel',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '39.2.0-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'qemu-kvm-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '15:4.2.0-48.module_el8.4.0+885+5e18b468.3',
          Vulnerabilities: [],
        },
        {
          Name: 'libcroco',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.6.12-4.el8_2.1',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus-daemon',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'libcomps',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.1.11-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'keyutils-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.5.10-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'bash',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '4.4.20-1.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'platform-python-setuptools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '39.2.0-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libssh-config',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.9.4-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'qemu-kvm-block-curl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '15:4.2.0-48.module_el8.4.0+885+5e18b468.3',
          Vulnerabilities: [],
        },
        {
          Name: 'libpmem',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.6.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libXfixes',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '5.0.3-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-libcomps',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.1.11-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libgpg-error',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.31-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'xz-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '5.2.4-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libksba',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.3.5-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'coreutils-single',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '8.30-8.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'nss',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.53.1-17.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'snappy',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.1.8-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'shared-mime-info',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.9-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libcom_err',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.45.6-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'numactl-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.0.12-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gnupg2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.2.20-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glusterfs-client-xlators',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '6.0-49.1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dejavu-fonts-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.35-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'sgabios-bin',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:0.20170427git-3.module_el8.4.0+783+f8734d30',
          Vulnerabilities: [],
        },
        {
          Name: 'trousers',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.3.15-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'device-mapper',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '8:1.02.175-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libfdisk',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glibc-minimal-langpack',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.28-151.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libxml2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.9.7-9.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'libibverbs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '32.0-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'squashfs-tools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '4.3-20.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libglvnd-egl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.3.2-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dhcp-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '12:4.3.6-44.0.1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libidn2',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.2.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libXv',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.0.11-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libusbx',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.0.23-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'ethtool',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2:5.8-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'rpm-build-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '4.14.3-14.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'mesa-libGL',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '20.3.3-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'seavgabios-bin',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.13.0-2.module_el8.4.0+547+a85d02ba',
          Vulnerabilities: [],
        },
        {
          Name: 'libgcc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '8.4.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dbus',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.12.8-12.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'libdatrie',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.2.9-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'findutils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1:4.6.0-20.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glibc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.28-151.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gettext-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.19.8.1-17.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libpciaccess',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.14-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'boost-thread',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.66.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'rootfiles',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '8.1-22.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'yum',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '4.4.2-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'alsa-lib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.2.4-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gpg-pubkey',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:369b33970cf632c16d8d3e8430556523d35e0f77d51081772e07778f0a4e4000',
          Version: '8483c65d-5ccc5b19',
          Vulnerabilities: [],
        },
        {
          Name: 'pcre',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '8.42-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'grub2-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:2.02-99.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'krb5-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.18.2-8.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'glibc-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.28-151.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'systemd-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '239-45.el8_4.3',
          Vulnerabilities: [],
        },
        {
          Name: 'libjpeg-turbo',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.5.3-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'grub2-tools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:2.02-99.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libthai',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.1.27-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libcap',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.26-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'nss-sysinit',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.53.1-17.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'procps-ng',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.3.15-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'nspr',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '4.25.0-2.el8_2',
          Vulnerabilities: [],
        },
        {
          Name: 'ipxe-roms-qemu',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '20181214-8.git133f4c47.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dnf-data',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '4.4.2-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libcacard',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3:2.7.0-2.el8_1',
          Vulnerabilities: [],
        },
        {
          Name: 'libzstd',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.4.4-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libutempter',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.1.6-14.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'expat',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.2.5-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libxshmfence',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.3-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'systemd-pam',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '239-45.el8_4.3',
          Vulnerabilities: [],
        },
        {
          Name: 'grep',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.1-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'setup',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.12.2-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libglvnd-gles',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.3.2-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'kexec-tools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.0.20-46.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'iptables-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.8.4-17.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libibumad',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '32.0-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'bind-export-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '32:9.11.26-4.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'librdmacm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '32.0-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'librbd1',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:12.2.7-9.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'fribidi',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.0.4-8.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libvisual',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:0.4.0-25.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'systemd-udev',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '239-45.el8_4.3',
          Vulnerabilities: [],
        },
        {
          Name: 'cyrus-sasl-lib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.1.27-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'ncurses-base',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '6.1-7.20180224.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'edk2-ovmf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '20200602gitca407c7246bf-4.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'vim-minimal',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2:8.0.1763-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'readline',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '7.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libaio',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.3.112-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gmp',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1:6.1.2-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'kmod',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '25-17.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'cracklib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.9.6-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'spice-server',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.14.3-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'zlib',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.2.11-17.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libedit',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.1-23.20170329cvs.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libtasn1',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '4.13-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'pciutils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.7.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'qemu-kvm-core',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '15:4.2.0-48.module_el8.4.0+885+5e18b468.3',
          Vulnerabilities: [],
        },
        {
          Name: 'device-mapper-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '8:1.02.175-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-pip-wheel',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '9.0.3-19.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gawk',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '4.2.1-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'setuptools',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '39.2.0',
          Vulnerabilities: [],
        },
        {
          Name: 'dracut-squash',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '049-135.git20210121.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libXxf86vm',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.1.4-9.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libmount',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'xz',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '5.2.4-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'rpm-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '4.14.3-14.el8_4',
          Vulnerabilities: [],
        },
        {
          Name: 'nss-softokn-freebl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.53.1-17.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'kmod-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '25-17.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'nss-util',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.53.1-17.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'dracut-network',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '049-135.git20210121.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gstreamer1-plugins-base',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.16.1-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libvorbis',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.3.6-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libX11-common',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.6.8-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'diffutils',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '3.6-6.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libreport-filesystem',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.9.5-15.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'hwdata',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.314-8.8.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'fontconfig',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.13.1-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'freetype',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.9.1-4.el8_3.1',
          Vulnerabilities: [],
        },
        {
          Name: 'xkeyboard-config',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.28-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libX11',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.6.8-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libyaml',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.1.7-5.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libstdc++',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '8.4.1-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dejavu-sans-fonts',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '2.35-7.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'openssh-clients',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '8.0p1-6.el8_4.2',
          Vulnerabilities: [],
        },
        {
          Name: 'librepo',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '1.12.0-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'lzo',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.08-14.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libacl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.2.53-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'iproute',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '5.9.0-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'crypto-policies-scripts',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '20210209-1.gitbfb6bed.el8_3',
          Vulnerabilities: [],
        },
        {
          Name: 'libwayland-egl',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.17.0-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'ipcalc',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '0.2.4-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'centos-linux-repos',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '8-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'boost-random',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.66.0-10.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gettext',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.19.8.1-17.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'dnf',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '4.4.2-11.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'python3-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.6.8-37.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libtheora',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.1.1-21.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'tzdata',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2021a-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'userspace-rcu',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '0.10.1-4.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libuuid',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.32.1-27.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'gstreamer1',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1.16.1-2.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libattr',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '2.4.48-3.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'libglvnd-glx',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '1:1.3.2-1.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'grubby',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '8.40-41.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'sqlite-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.26.0-13.el8',
          Vulnerabilities: [],
        },
        {
          Name: 'qemu-kvm-block-gluster',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:76c3fc91354b01af7567241f118c944f5f4ca3ba2de10829d6cdd2066c760c34',
          Version: '15:4.2.0-48.module_el8.4.0+885+5e18b468.3',
          Vulnerabilities: [],
        },
        {
          Name: 'audit-libs',
          VersionFormat: '',
          NamespaceName: '',
          AddedBy:
            'sha256:a1d0c75327776413fa0db9ed3adcdbadedc95a662eb1d360dad82bb913f8a1d1',
          Version: '3.0-0.17.20191104git1c2f876.el8',
          Vulnerabilities: [],
        },
      ],
    },
  },
};

mock.onGet(securityUrl).reply((request) => {
  return [200, mockSecurityResponse];
  // return [200, mockResponseNoVulns];
});
