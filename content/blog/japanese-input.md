---
title: "Japanese input in openSUSE Tumbleweed's KDE"
description: "Here are the steps to install fcitx5 and fcitx5-mozc input method for Japanese in openSUSE Tumbleweed."
date: "2024-01-15"
minRead: 5
image: "/blog/japanese-input/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
      src: "/avatar.jpg"
      alt: "Iván Álvarez"
tags:
   - "linux"
---
# Situation

Last year, after a pretty bad blackout, I decided to test the native Btrfs snapshots in openSUSE Tumbleweed and switch from Ubuntu 22.10 on my personal laptop. Change always brings learning with it, but most forum answers leaned toward GNOME.

Here are the steps to install **fcitx5** and **fcitx5-mozc** input method for Japanese in **openSUSE Tumbleweed**:

# Solution

Open the terminal and enter the following command to install **fcitx5** and **fcitx5-mozc**[^1]:

   ```shell
   sudo zypper install fcitx5-mozc
   ```

Next, if you aren't using a desktop environment [^2] you may need to configure the input method. To do this, create or open `~/.profile` and add the following lines:

   ```bash
   export GTK_IM_MODULE=fcitx
   export QT_IM_MODULE=fcitx
   export XMODIFIERS=@im=fcitx
   ```

Save the file and restart your system.

Once you've restarted, open the **fcitx5 configuration tool** by running:

   ```bash
   fcitx5-configtool
   ```

In the configuration tool, click the **Input Method** tab and select the **+** button to add a new input method.

Select **Mozc** from the list of input methods and click on the **Add** button.

You can now switch to the **Mozc** input method by pressing the **Ctrl + Space** keys.

Let me know if you have any questions.

# References

Photo by <a href="https://unsplash.com/@frederickjmedina?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Frederick Medina</a> on <a href="https://unsplash.com/photos/person-holding-brown-bread-with-yellow-sliced-fruit-6SWHWcLyD-8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

[^1]: Japanese input in plasma 5.8 kde <https://forums.opensuse.org/t/japanese-input-in-plasma-5-8-kde/125211>
[^2]: Localization/Japanese - ArchWiki. <https://wiki.archlinux.org/title/Localization/Japanese>.
