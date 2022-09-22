import {Td} from '@patternfly/react-table';
import {Skeleton} from '@patternfly/react-core';
import './css/Organizations.scss';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {fetchOrg} from 'src/resources/OrganizationResource';
import {
  fetchRepositoriesForNamespace,
  IRepository,
} from 'src/resources/RepositoryResource';
import {fetchMembersForOrg} from 'src/resources/MembersResource';
import {fetchRobotsForNamespace} from 'src/resources/RobotsResource';
import {formatDate} from 'src/libs/utils';
import ColumnNames from './ColumnNames';
import {OrganizationsTableItem} from './OrganizationsList';

interface CountProps {
  count: string | number;
}

interface RepoLastModifiedDateProps {
  lastModifiedDate: number;
}

function Count(props: CountProps) {
  return <>{props.count !== null ? props.count : <Skeleton width="100%" />}</>;
}

function RepoLastModifiedDate(props: RepoLastModifiedDateProps) {
  return (
    <>
      {props.lastModifiedDate !== 0 ? (
        formatDate(props.lastModifiedDate)
      ) : (
        <Skeleton width="100%" />
      )}
    </>
  );
}

// Get and assemble data from multiple endpoints to show in Org table
// Only necessary because current API structure does not return all required data
export default function OrgTableData(props: OrganizationsTableItem) {
  const [teamCount, setTeamCount] = useState<string | number>(null);
  const [memberCount, setMemberCount] = useState<string | number>(null);
  const [robotCount, setRobotCount] = useState<string | number>(null);
  const [repoCount, setRepoCount] = useState<string | number>(null);
  const [lastModifiedDate, setLastModifiedDate] = useState<number>(0);
  const getLastModifiedRepoTime = (repos: IRepository[]) => {
    // get the repo with the most recent last modified
    if (!repos || !repos.length) {
      return -1;
    }

    const recentRepo = repos.reduce((prev, curr) =>
      prev.last_modified < curr.last_modified ? curr : prev,
    );
    return recentRepo.last_modified;
  };

  useEffect(() => {
    let teamCountVal = null;
    let memberCountVal = null;
    let robotCountVal = null;
    let repoCountVal = null;
    let lastModifiedVal = null;

    // Grab data for Team column
    const fetchTeamCount = async () => {
      try {
        if (!props.isUser) {
          const data = await fetchOrg(props.name);
          teamCountVal = data?.teams ? Object.keys(data?.teams)?.length : 0;
        }
      } catch (err) {
        console.error(err);
        teamCountVal = 'Error';
      } finally {
        setTeamCount(teamCountVal);
      }
    };

    // Grab data for Member column
    const fetchMemberCount = async () => {
      try {
        if (!props.isUser) {
          const data = await fetchMembersForOrg(props.name);
          memberCountVal = data.length;
        }
      } catch (err) {
        console.error(err);
        memberCountVal = 'Error';
      } finally {
        setMemberCount(memberCountVal);
      }
    };

    // Grab data for Robot column
    const fetchRobotCount = async () => {
      try {
        const data = await fetchRobotsForNamespace(props.name);
        robotCountVal = data.length;
      } catch (err) {
        console.error(err);
        robotCountVal = 'Error';
      } finally {
        setRobotCount(robotCountVal);
      }
    };

    // Grab data for Repo and LastModified columns
    const fetchRepoCount = async () => {
      try {
        const data = await fetchRepositoriesForNamespace(props.name);
        repoCountVal = data.length;
        lastModifiedVal = getLastModifiedRepoTime(data);
      } catch (err) {
        console.error(err);
        repoCountVal = 'Error';
        lastModifiedVal = 0;
      } finally {
        setRepoCount(repoCountVal);
        setLastModifiedDate(lastModifiedVal);
      }
    };

    // Trigger async calls
    fetchTeamCount();
    fetchMemberCount();
    fetchRobotCount();
    fetchRepoCount();
  }, []);

  return (
    <>
      <Td dataLabel={ColumnNames.name}>
        <Link to={props.name}>{props.name}</Link>
      </Td>
      <Td dataLabel={ColumnNames.repoCount}>
        <Count count={repoCount}></Count>
      </Td>
      <Td dataLabel={ColumnNames.teamsCount}>
        <Count count={teamCount}></Count>
      </Td>
      <Td dataLabel={ColumnNames.membersCount}>
        <Count count={memberCount}></Count>
      </Td>
      <Td dataLabel={ColumnNames.robotsCount}>
        <Count count={robotCount}></Count>
      </Td>
      <Td dataLabel={ColumnNames.lastModified}>
        <RepoLastModifiedDate
          lastModifiedDate={lastModifiedDate}
        ></RepoLastModifiedDate>
      </Td>
    </>
  );
}
