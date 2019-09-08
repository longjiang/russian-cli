<template>
  <div class="youtube-browse container mt-5 mb-5 main">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">Study YouTube Subtitles</h1>
        <h4 class="mt-5 mb-5 text-center">Search YouTube</h4>
        <SimpleSearch
          placeholder="Enter a search term in Russian..."
          :action="
            url => {
              location.hash = '#/youtube/search/' + encodeURIComponent(url)
            }
          "
          ref="search"
          class="mb-5"
        />
        <h4 class="mt-5 mb-5 text-center">
          Recommended Channels
        </h4>
        <ul class="list-unstyled p-0 mb-5 cards">
          <li v-for="channel in channels" class="p-4 mb-4 card">
            <YouTubeChannelCard :channel="channel" />
          </li>
        </ul>

        <h4 class="mt-5 mb-5">
          Study
          <em>any</em> YouTube video that has Russian closed captions
        </h4>

        <div class="jumbotron bg-light pt-4 pb-3 mt-3 mb-3">
          <YouTubeNav class="mb-4" />
          <ol>
            <li>
              Go to YouTube, search a Russian word. For example
              <b>纪录片</b>.
            </li>
            <li>
              Click on
              <b>Filter</b>, and choose
              <b>Subtitls/CC.</b>
            </li>
            <li>
              Open a video that interests you. <br /><small
                ><b>Note:</b> Many have closed captions, but they are in
                <em>English.</em> You need to look for <em>Russian</em> closed
                captions. These are hard to find. If you cannot find any, look
                in the suggested channels listed on this page.</small
              >
            </li>
            <li>
              Copy the video's URL, paste it into the box above, and press
              <b>Enter</b>
              or click
              <b>Study.</b>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeNav from '@/components/YouTubeNav'
import YouTubeChannelCard from '@/components/YouTubeChannelCard'
import SimpleSearch from '@/components/SimpleSearch'

export default {
  components: {
    YouTubeNav,
    YouTubeChannelCard,
    SimpleSearch
  },
  props: {
    args: {
      type: String
    }
  },
  data() {
    return {
      location,
      channels: [
        {
          id: 'UC4avx8a88gPKzkitH0zTO4w',
          title: 'TRY MORE',
          description:
            'A channel with lots of videos with Russian and English subtitles.',
          avatar:
            'https://yt3.ggpht.com/a/AGF-l78DSGaofeLyN2aTHkcmcMYZFSZQjyjZwUNdRA=s288-c-k-c0xffffffff-no-rj-mo'
        },
        {
          id: 'UCY0C6A3t3RTUN3BB65rWAgQ',
          title: 'Ленинград | Leningrad',
          description: 'A music group from St. Petersburg.',
          avatar:
            'https://yt3.ggpht.com/a-/AAuE7mAmbx8EQTBRJDRtTjBhUhhJhZoImQ3JAoLpOjA4Tw=s48-c-k-c0xffffffff-no-nd-rj'
        }
      ]
    }
  }
}
</script>
