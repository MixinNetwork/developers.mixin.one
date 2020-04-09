<template>
  <footer>
    <div class="container">
      <div class="community">
        <h6
          class="animate-up"
          data-animate="fadeInUp,1s,easin-in-out"
        >{{$t('home.footer.community.title')}}</h6>
        <ul>
          <li
            v-for="(value, key,index) in $t('home.footer.community.list')"
            :key="key"
            class="animate-up"
            :data-animate="`fadeInUp,1s,easin-in-out,${(index+1)/10}s`"
          >
            <div>
              <img :src=" require(`@/assets/img/footer/${key}.png`)" />
            </div>
            <span>{{value}}</span>
          </li>
        </ul>
      </div>
      <div class="resources">
        <h6
          class="animate-up"
          data-animate="fadeInUp,1s,easin-in-out"
        >{{$t('home.footer.resources.title')}}</h6>
        <ul>
          <li
            v-for="(item, index) in $t('home.footer.resources.list')"
            :key="index"
            class="animate-up"
            :data-animate="`fadeInUp,1s,easin-in-out,${(index+1) / 5}s`"
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
footer {
  background: #eef1f9;
  height: 520px;
  padding-top: 110px;
  margin-top: 300px;
  display: flex;
  justify-content: center;

  .container {
    display: flex;
    justify-content: space-around;
    width: 47.875rem;
  }

  h6 {
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0.488889px;

    margin-bottom: 3.75rem;

    color: #333333;
  }

  .community {
    ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 20.75rem;
    }
    li {
      display: flex;
      align-items: center;
      margin-bottom: 3rem;

      div {
        width: 40px;
      }

      span {
        font-style: italic;
      }

      &:nth-child(1) {
        img {
          width: 24px;
        }
      }
      &:nth-child(2) {
        img {
          width: 26px;
        }
      }
      &:nth-child(3) {
        img {
          width: 15px;
          height: 25px;
        }
      }
      &:nth-child(4) {
        div {
          height: 16px;
        }
        img {
          width: 30px;
        }
      }
      &:nth-child(5) {
        img {
          width: 27px;
        }
      }
      &:nth-child(6) {
        img {
          width: 25px;
        }
      }
    }
  }
  .resources {
    li {
      margin-bottom: 3.5rem;
    }
  }
}

@media screen and (max-width: 60rem) {
  footer {
    margin-top: 0;
    height: 688px;
    padding: 0 2.25rem;

    .container {
      flex-direction: column;
      justify-content: start;
      width: initial;
      height: 100%;
      padding-top: 1.25rem;
    }

    h6 {
      margin-top: 5rem;
      margin-bottom: 2.625rem;
    }

    .community {
      ul {
        width: 100%;
        min-width: 18rem;
      }
      li {
        margin-bottom: 2rem;
      }
    }

    .resources {
      h6 {
        margin-top: 3rem;
      }
      li {
        margin-bottom: 1.88rem;
      }
    }
  }
}
</style>