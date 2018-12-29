![Splinker](/images/splinker.png)

# Splinker
===================================

Splinker is a max for live project that can, in real-time, read events from a 
stream of audio, compare the events to a trained database of known
samples, and then trigger different midi notes, CC, or ableton parameter changes 
when matches are found.  It is built on Pure Data's excellent 'bonk~' 
object.

## Installation 
---------------
Supposing you run Live 10 and Max 8 on Mac:

1. Plac the splinker repository contents to ~/Documents/Max8/Library
2. Download or compile bonk~.mxo from http://github.com/anthonylauzon/bonk
3. Place bonk~.mxo file in ~/Documents/Max8/Library

If you run Windows, your Library directories will be different and you'll have 
to compile bonk~ for your platform.

## Usage
---------
### Training a Sound Database
-----------------------------
1. Load splinker_learn.amxd onto a channel.
2. Choose the number of hits per instrument you'd like to train.
3. Stack your instrument hits as clips in a session-mode ableton track.

![Hit Example](/images/hits.png)

4. Set the legato follow action on the clips to "Next".

![Next Example](/images/next.png)

5. Set the legato follow action on the last clip to "None".
6. Press "Start Training" in the splinker_train.amxd device.
7. Launch the first clip.  The clips will play in order, training the database.
8. After the clips play, press "Stop Training" in the splinker_train device.
9. Press "Save" in the splinker_train device.

You now have a spectral database of sounds for matching events to.

### Triggering Events
---------------------
1. Load splinker_midi.amxd onto some midi channel. It will look empty.
2. Load splinker_audio.amxd onto some audio or instrument channel.
3. Load the database in splinker_audio using "Load Other", or set a directory
where you keep your database files. They will populate the dropdown.

![Splinker Audio](/images/splinker_audio.png)

4. Play audio through the audio channel splinker_audio is on.
5. Go back to the midi channel splinker_midi is on. There are now X number of 
midi devices depending on the number of instruments loaded in the audio channel.

![Splinker Midi](/images/splinker_midi.png)

6. Turn on the note, cc, or ableton parameter button for whichever event you'd
like to trigger per-channel.  You can do then simultanously, as well.

If everything worked, you can now sit back and have fun splinking!

