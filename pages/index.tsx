import Head from 'next/head';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spacer,
} from '@chakra-ui/react';
import { GET_ALL_RECIPES } from '~/graphql/Queries';
import { RecipeAllData } from '~/types/recipe';
import styles from '~/styles/Home.module.css';

export default function Home() {
  const { loading, error, data } = useQuery<RecipeAllData>(GET_ALL_RECIPES);

  return (
    <>
      <Head>
        <title>Recipe</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <Flex h='90px' justifyContent={'center'} alignItems={'center'} gap={5}>
          <Flex>
            <Select defaultValue={'요리'} w={20}>
              <option value={'제목'}>제목</option>
              <option value={'요리'}>요리</option>
              <option value={'재료'}>재료</option>
              <option value={'유튜버'}>유튜버</option>
            </Select>

            <InputGroup w={40}>
              <InputLeftElement pointerEvents='none'>
                <Search2Icon color='gray.300' />
              </InputLeftElement>
              <Input type={'text'} />
            </InputGroup>
          </Flex>
          <Button>검색</Button>
        </Flex>
      </header>

      <main className={styles.main}>
        {data?.recipes.data.map((recipe) => (
          <div key={recipe.id}>{recipe.attributes.title}</div>
        ))}
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs' className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href='https://nextjs.org/learn' className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href='https://github.com/vercel/next.js/tree/canary/examples'
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
}
