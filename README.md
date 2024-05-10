# CONTENTS
- [BRIEFING](#briefing)
- [DATABASE INDEXES & RELATIONS](#database-indexes--relations)
- [ENDPOINTS](#endpoints)
  - [Overview](#overview)

# BRIEFING
![BRIEFING](https://github.com/lsodiogo/academix-hub-manager/blob/main/docs/briefing.svg)

# DATABASE INDEXES & RELATIONS
| TABLE | INDEX | RELATION |
| ------ | ------ | ------ |
| ALL | id → primary key
| courses | name + edition_number → unique | teacher_id, status_id |
| lessons_schedule | date + begin_time + end_time + course_id → unique | course_id, status_id |
| school | name → unique
| | name + abbreviation → unique |
| status | name → unique |
| students | names + surnames → unique | course_id, status_id |
| teachers | names + surnames → unique | status_id
| users | email → unique |

# ENDPOINTS
## Overview
This app uses the following endpoints and methods: