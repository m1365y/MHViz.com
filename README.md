# American_Health_Dashboard

Group 4 Proposal (American Health and Wellness Dashboard)

Datasets:

1. 2022 Release - 2019 & 2020 : https://data.cdc.gov/resource/epbn-9bv3.json
 
2. 2023 Release - 2020 & 2021 : https://data.cdc.gov/resource/eav7-hnsx.json

Goal of Project: 

Using two-year health data from the CDC to create visuals for the data and using an ML model to predict the outcome

Problem-Statement:

Visualization of the data is currently focused towards simple monitoring and tracking. This presents a unique challenge for visualization and interactivity; the new dashboard will solve for this by providing:

- Improved Interactivity and data insights.
- Improved trend visualization featuring heat-mapping for data.
- Healthcare and Mental Health Resource Needs:
   * Insurance levels across the United States (create a dashboard that allows users to see the various areas of the US that have coverage and the density of coverage).
   * Display general healthcare & mental health trends across the US.

Due to the heavy volume of data if we use all of the data points from the CDC (1 to 3 million datapoints per year), filtering on five (7) health data points and thirteen (13) states would be the best approach.

Health data points:
1. Cancer (except Skin)
2. Coronary Heart Disease
3. COPD
4. Obesity
5. Diabetes
6. Health Insurance
7. Annual Checkup

Thirteen (13) states:
1. Alabama
2. Arizona
3. Arkansas
4. California
5. Colorado
6. Connecticut
7. Delaware
8. District of Columbia
9. Georgia
10. Hawaii
11. Idaho
12. Illinois
13. Indiana

For Machine Learning, we'll be using the KNN model since we have two years of data for comparison.

Role Assignments:


*/ Lead Developer: Masoud

- Overall Design, Structure, and Implementation

*/ Git Master – Nathir (Thursday)

- Set-up Master Repo
- Settings: Collaborators
- README
- Git Pages

*/ Database Engineering: Edwin & Ronald

- ETL - includes extracting, filtering, sorting, dropping NaN, merging, concatinating, model testing, etc.
- Database Development (MySQL)

*/ Flask (Nathir – Backup Dev)

*/ Front-End Development Team: Nathir, Edwin, Ronald, Masoud

- User-Interface and Design (Figma front-end design)

- Javascript, CSS (bootstrap), HTML, Python, Pandas
