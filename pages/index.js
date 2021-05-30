import React from "react";
import { Grid, GridItem } from "@chakra-ui/layout";
import Container from "components/ui/Container";
import RegisterForm from "components/members/RegisterForm";
import PublicLayout from "components/ui/layout/PublicLayout";
import Seo from "components/ui/layout/Seo";
import { fetchDepartments } from "utils/useDepartments";

export default function index(props) {
  return (
    <PublicLayout>
      <Seo title="Asociáte"></Seo>
      <Container py={4}>
        <Grid
          templateColumns={{
            base: "repeat(1, minmax(auto, 1fr))",
            md: "repeat(1, minmax(auto, 1fr))",
            xl: "repeat(5, minmax(auto, 1fr))"
          }}
          gap={4}
          pb="16"
        >
          <GridItem colSpan={{ xl: 3 }}>
            <RegisterForm departments={props.departments} />
          </GridItem>
          <GridItem />
        </Grid>
      </Container>
    </PublicLayout>
  );
}

export async function getStaticProps() {
  const response = await fetchDepartments();
  return {
    props: {
      departments: response.data
    }
  };
}
